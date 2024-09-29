<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Illuminate\Http\Request;

class PrintController extends Controller
{
    public function cetak_pesanan(Request $request)
    {
        $query = Pesanan::query()->withCount('detailPesanan')->with('user', 'invoice');

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
        return inertia('Admin/PesananPelanggan/CetakPesanan', compact('pesanan'));
    }
}
