<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DetailPesanan;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class KonfirmasiPesananPaket extends Controller
{
    public function index(Request $request)
    {
        $query = DetailPesanan::query()->with('pesanan', 'paket');
        $detail = $query->latest()->get();
        return inertia('Admin/ListPaketPesanan/List', compact('detail'));
    }
    public function create(Request $request)
    {

        if ($request->paramsKonfirm['status'] === "di terima") {
            $cekPesanan = DetailPesanan::where('pesanan_id', $request->modelKonfirm['pesanan_id'])->whereIn('status_pesanan_paket', ['di tolak', 'menunggu konfirmasi'])->whereNot('paket_id', $request->modelKonfirm['paket_id'])->get();
            $detailPesanan = DetailPesanan::findOrFail($request->modelKonfirm['id']);

            if ($cekPesanan) {
                $pesanan = Pesanan::findOrFail($request->modelKonfirm['pesanan_id']);
                $pesanan->update(['aktif_payment' => 'ya']);
            } else {
                $pesanan = Pesanan::findOrFail($request->modelKonfirm['pesanan_id']);
                $pesanan->update(['aktif_payment' => 'ya']);
            }
            $detailPesanan->update(['status_pesanan_paket' => 'di terima']);
        } else {
            if ($request->paramsKonfirm['catatan'] === null) {
                return redirect()->back()->withErrors(['error' => 'Catatan harus di isi']);
            }

            $detailPesanan = DetailPesanan::findOrFail($request->modelKonfirm['id']);
            $detailPesanan->update(['status_pesanan_paket' => 'di tolak', 'catatan_penolakan' => $request->paramsKonfirm['catatan']]);
            $pesanan = Pesanan::findOrFail($request->modelKonfirm['pesanan_id']);
            $pesanan->update(['aktif_payment' => 'tidak']);
        }
    }
}
