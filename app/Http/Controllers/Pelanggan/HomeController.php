<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Paket;
use App\Models\Team;
use App\Models\UlasanStudio;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $load = 8;
        if ($request->load) {
            $load = $request->load;
        }
        $paket = Paket::latest()->get()->take($load);
        $team = Team::latest()->get();
        $ulasan = UlasanStudio::where('kofirmasi_ulasan', 'di terima')->get();
        return inertia('Pelanggan/Home', compact('paket', 'team', 'ulasan'));
    }
}
