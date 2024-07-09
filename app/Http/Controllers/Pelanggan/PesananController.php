<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\DetailPesanan;
use App\Models\Paket;
use App\Models\Pelanggan;
use App\Models\Pesanan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PesananController extends Controller
{
    public function index(Request $request)
    {
        $query = Pesanan::query()->withCount('detailPesanan')->with('invoice')->where('user_id', $request->user()->id);

        if ($request->cari) {
            $query->where('kd_pesanan', $request->cari);
        }
        if ($request->status) {
            $query->where('status_pemesanan', $request->status);
        }
        if ($request->dari_tanggal) {
            $query->where('tgl_pesanan', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->where('tgl_pesanan', '<=', $request->sampai_tanggal);
        }
        $pesanan = $query->latest()->get();
        return inertia('Pelanggan/PesananSaya/Index', compact('pesanan'));
    }
    public function show(Request $request, $kd_pesanan)
    {
        $pesanan = Pesanan::withCount(['detailPesanan as pesanan_ditolak' => function ($q) {
            $q->where('status_pesanan_paket', 'di tolak');
        }])->with('invoice')->where('kd_pesanan', $kd_pesanan)->latest()->first();

        $detail = DetailPesanan::where('pesanan_id', $pesanan->id)->with('paket')->latest()->get();


        return inertia('Pelanggan/PesananSaya/Show', compact('detail', 'pesanan'));
    }
    public function add_cart(Request $request)
    {

        $request->validate([
            "tanggal_foto" => 'required|string|after:now',
            "jam_foto" => 'required|string',
            "catatan" => 'nullable|string',
        ]);
        $paket_id = Paket::findOrFail($request->paket_id);

        $user = $request->user();
        $cekPesanan = Pesanan::where('user_id', $user->id)
            ->where('status_pembayaran', 'belum lunas')
            ->where('status_pemesanan', 'belum selesai')
            ->first();
        if ($cekPesanan) {
            // cek paket apakah sudah di pesan atau belum
            $cekPaket = DetailPesanan::where('paket_id', $request->paket_id)->where('pesanan_id', $cekPesanan->id)->first();
            if ($cekPaket) {

                return redirect()->back()->withErrors(['message' => 'anda sudah menambahkan ini di daftar pesanan anda']);
            } else {
                $detail_pesanan = DetailPesanan::create([
                    "pesanan_id" => $cekPesanan->id,
                    "paket_id" => $paket_id->id,
                    "tanggal_foto" => Carbon::parse($request->tanggal_foto),
                    "jam_foto" => $request->jam_foto,
                    "harga_booking" => $paket_id->harga_paket,
                    "catatan" => $request->catatan,
                ]);

                $cekPesanan->update([
                    'total_pembayaran' => $cekPesanan->total_pembayaran + $paket_id->harga_paket,
                ]);
            }
        } else {
            $pesanan = Pesanan::create([
                'user_id' => $user->id,
                "kd_pesanan" => now()->format('ymd') . "00" . Pesanan::count(),
                "tgl_pesanan" => now(),
                "total_pembayaran" => $paket_id->harga_paket,
            ]);
            $detail_pesanan = DetailPesanan::create([
                "pesanan_id" => $pesanan->id,
                "paket_id" => $paket_id->id,
                "tanggal_foto" => Carbon::parse($request->tanggal_foto),
                "jam_foto" => $request->jam_foto,
                "harga_booking" => $paket_id->harga_paket,
                "catatan" => $request->catatan,
            ]);
        }
    }

    public function edit_cart(Request $request)
    {

        $request->validate([
            "tanggal_foto" => 'required|string|after:now',
            "jam_foto" => 'required|string',
            "catatan" => 'nullable|string',
        ]);
        $detail_pesanan = DetailPesanan::findOrFail($request->id);

        $detail_pesanan->update([
            'status_pesanan_paket' => 'menunggu konfirmasi',
            "tanggal_foto" => Carbon::parse($request->tanggal_foto),
            "jam_foto" => $request->jam_foto,
            "catatan" => $request->catatan,
        ]);
    }

    public function remove_cart(Request $request)
    {

        $detail = DetailPesanan::findOrFail($request->id);
        $pesanan = Pesanan::findOrFail($detail->pesanan_id);
        $total = $pesanan->total_pembayaran - $detail->harga_paket;

        $pesanan->update(['total_pembayaran' => $pesanan->total_pembayaran - $detail->harga_booking]);
        $detail->delete();
    }

    public function cancell_pesanan(Request $request)
    {
        $pesanan = Pesanan::where('kd_pesanan', $request->kd_pesanan)->first();
        $pesanan->update([
            'status_pemesanan' => 'di batalkan',
            'aktif_payment' => 'tidak',
        ]);
    }

    public function invoice_pesanan(Request $request, $kd_pesanan)
    {
        $pesanan = Pesanan::where('kd_pesanan', $kd_pesanan)
            ->with(['user', 'invoice', 'detailPesanan' => function ($q) {
                $q->with('paket');
            }])
            ->first();

        return inertia('Pelanggan/PesananSaya/InvoicePesanan', compact('pesanan'));
    }
}
