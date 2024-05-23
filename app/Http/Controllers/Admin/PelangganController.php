<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use Illuminate\Http\Request;

class PelangganController extends Controller
{
    public function index(Request $request)
    {
        $query = Pelanggan::query()->with(['user' => function ($q) {
            $q->withCount('pesanan as jumlah_pesanan');
        }]);
        $pelanggan = $query->latest()->get()->take(4);

        return inertia('Admin/Pelanggan/Index', compact('pelanggan'));
    }
}
