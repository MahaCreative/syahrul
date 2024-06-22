<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Paket;
use Illuminate\Http\Request;

class DaftarPaketController extends Controller
{
    public function index(Request $request)
    {

        $query = Paket::query()->with('kategori');
        if ($request->cari) {
            $query->where('nama_paket', 'like', '%' . $request->cari . '%');
        }
        if ($request->status) {
            $query->where('aktif_paket', $request->status  == 1 ? true : false);
        }
        if ($request->lokasi) {
            $query->where('lokasi_foto', $request->lokasi);
        }
        if ($request->kategori_id) {
            $query->where('kategori_id', $request->kategori_id);
        }
        $paket = $query->latest()->get();
        return inertia('Pelanggan/DaftarPaket/DaftarPaket', compact('paket'));
    }
}
