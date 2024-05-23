<?php

namespace App\Http\Controllers;

use App\Models\UlasanStudio as ModelsUlasanStudio;
use Illuminate\Http\Request;

class UlasanStudio extends Controller
{
    public function store(Request $request)
    {
        $attr = $request->validate([
            "foto" => 'nullable|image|mimes:jpg,jpeg,png,webp',
            "nama" => 'required|min:10',
            "ulasan" => 'required|string|min:20',
            "rating" => 'required|in:1,2,3,4,5',
        ]);
        $attr['foto'] = $request->file('foto') ? $request->file('foto')->store('ulasan') : null;
        ModelsUlasanStudio::create($attr);
        return redirect()->back();
    }
}
