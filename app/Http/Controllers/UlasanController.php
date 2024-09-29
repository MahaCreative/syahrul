<?php

namespace App\Http\Controllers;

use App\Models\UlasanStudio;
use Illuminate\Http\Request;

class UlasanController extends Controller
{
    public function index(Request $request)
    {
        $query = UlasanStudio::query();

        $ulasan = $query->get();
        return inertia('Admin/KelolaUlasan/Index', compact('ulasan'));
    }
}
