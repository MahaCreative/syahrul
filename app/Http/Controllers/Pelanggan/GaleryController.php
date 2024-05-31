<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Galery;
use Illuminate\Http\Request;

class GaleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Galery::query();

        $galery = $query->get();
        return inertia('Pelanggan/Galery', compact('galery'));
    }
}
