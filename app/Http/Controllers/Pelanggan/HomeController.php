<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\Paket;
use App\Models\Team;
use App\Models\UlasanStudio;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $load = 8;
        $query = Paket::query()->with('kategori');
        if ($request->load) {
            $load = $request->load;
        }

        $paket = $query->latest()->get()->take($load);
        $kategori = Kategori::latest()->get();
        $team = Team::latest()->get();
        $ulasan = UlasanStudio::where('kofirmasi_ulasan', 'di terima')->get();
        return inertia('Pelanggan/Home', compact('paket', 'team', 'ulasan', 'kategori'));
    }
}
