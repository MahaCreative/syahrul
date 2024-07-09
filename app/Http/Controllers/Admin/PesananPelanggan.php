<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DetailPesanan;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class PesananPelanggan extends Controller
{
    public function index(Request $request)
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
        return inertia('Admin/PesananPelanggan/Index', compact('pesanan'));
    }
    public function show_user(Request $request, $id)
    {
        $query = Pesanan::query()->withCount('detailPesanan')->with('user')->where('user_id', $id);

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
        return inertia('Admin/PesananPelanggan/ShowPesananUser', compact('pesanan', 'id'));
    }

    public function detail_pesanan(Request $request, $kd_pesanan)
    {
        $pesanan = Pesanan::withCount(['detailPesanan as pesanan_ditolak' => function ($q) {
            $q->where('status_pesanan_paket', 'di tolak');
        }])->where('kd_pesanan', $kd_pesanan)->latest()->first();

        $detail = DetailPesanan::where('pesanan_id', $pesanan->id)->with('paket')->latest()->get();

        return inertia('Admin/PesananPelanggan/DetailPesanan', compact('pesanan', 'detail'));
    }
}
