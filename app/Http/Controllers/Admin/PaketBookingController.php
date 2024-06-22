<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DetailPesanan;
use App\Models\Kategori;
use App\Models\Paket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaketBookingController extends Controller
{
    public function index(Request $request)
    {
        $query = Paket::query()->with('kategori')->withCount(['detail_pesanan as jumlah_pesanan' => function ($q) {
            $q->where('status_pesanan_paket', 'diterima');
        }]);
        $paket = $query->latest()->get();

        return inertia('Admin/PaketBooking/Index', compact('paket'));
    }

    public function show(Request $request, $id)
    {
        $query = Paket::query()->with(['detail_pesanan' => function ($q) {
            $q->with('pesanan');
        }])->where('id', $id);

        $paket = $query->latest()->first();

        return inertia('Admin/PaketBooking/Show', compact('paket'));
    }

    public function  create(Request $request)
    {

        $attr = $request->validate([
            "nama_paket" => 'required|string|min:6|max:70',
            "lokasi_foto" => 'required',
            "deskripsi_paket" => 'required|string',
            "harga_paket" => 'required|numeric',
            "catatan_paket" => 'required|string',
            "aktif_paket" => 'required',
            "gambar_paket" => 'required|image|mimes:png,jpeg,webp,jpg',
            'kategori_id' => 'required',
        ]);
        $kategori = Kategori::where('nama_kategori', $request->kategori_id)->first();
        $attr['kategori_id'] = $kategori->id;
        $attr['gambar_paket'] = $request->file('gambar_paket')->store('gambar_paket');
        $paket = Paket::create($attr);
        return redirect()->back();
    }
    public function  update(Request $request)
    {
        $attr = $request->validate([
            "nama_paket" => 'required|string|min:6|max:70',
            "lokasi_foto" => 'required',
            "deskripsi_paket" => 'required|min:50|max:400|string',
            "harga_paket" => 'required|numeric|min:5',
            "catatan_paket" => 'required|string:min:20|max:100',
            "aktif_paket" => 'required',
            "gambar_paket" => 'required',
            'kategori_id' => 'required',
        ]);
        $kategori = Kategori::where('nama_kategori', $request->kategori_id)->first();
        $attr['kategori_id'] = $kategori->id;
        $paket = Paket::findOrFail($request->id);
        $attr['gambar_paket'] = $paket->gambar_paket;
        if ($request->hasFile('gambar_paket')) {
            $request->validate([
                'gambar_paket' => 'image|mimes:png,jpeg,webp,jpg'
            ]);
            $attr['gambar_paket'] = $request->file('gambar_paket')->store('gambar_paket');
        }
        $paket->update($attr);
        return redirect()->back();
    }
    public function  delete(Request $request)
    {
        $paket = Paket::findOrFail($request->id);
        $paket->delete();
        return redirect()->back();
    }

    public function jumlahPesananPerBulanSelamaSetahun($id)
    {
        $satuTahunLalu = Carbon::now()->subYear();
        $sekarang = Carbon::now();

        // Ambil jumlah pesanan per bulan
        $jumlahPesanan = DB::table('detail_pesanans')
            ->join('pesanans', 'detail_pesanans.pesanan_id', '=', 'pesanans.id')
            ->where('pesanans.tgl_pesanan', '>=', $satuTahunLalu)
            ->where('pesanans.tgl_pesanan', '<=', $sekarang)
            ->where('detail_pesanans.paket_id', $id)
            ->select(DB::raw('MONTH(pesanans.tgl_pesanan) as bulan'), DB::raw('count(*) as jumlah'))
            ->groupBy(DB::raw('MONTH(pesanans.tgl_pesanan)'))
            ->get()
            ->keyBy('bulan')
            ->toArray();

        // Buat array bulan dengan nama bulan dalam bahasa Indonesia
        $namaBulan = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember',
        ];

        // Inisialisasi hasil akhir dengan nilai 0 untuk setiap bulan
        $hasilAkhir = [];
        for ($i = 1; $i <= 12; $i++) {
            $hasilAkhir[$i] = [
                'bulan' => $namaBulan[$i],
                'jumlah' => 0,
            ];
        }

        // Isi jumlah pesanan yang sebenarnya ada
        foreach ($jumlahPesanan as $bulan => $data) {
            $hasilAkhir[$bulan]['jumlah'] = $data->jumlah;
        }

        // Konversi hasil akhir menjadi array indexed
        $hasilAkhir = array_values($hasilAkhir);

        return $hasilAkhir;
    }
}
