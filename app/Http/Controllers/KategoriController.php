<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Paket;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function index(Request $request)
    {
        $kategori = Kategori::withCount('paket')->latest()->get();

        return inertia('Admin/Kategori/Index', compact('kategori'));
    }

    public function store(Request $request)
    {
        $request->validate(['nama_kategori' => 'required|string|min:3|max:25']);
        $kategori = Kategori::create([
            'nama_kategori' => $request->nama_kategori
        ]);
        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $kategori = Kategori::find($request->id);
        $paket = Paket::where('kategori_id', $request->id)->get();
        foreach ($paket as $key => $value) {
            $value->delete();
        }
        $kategori->delete();
        // return redirect()->route('admin.kategori.index');
        return redirect()->back();
    }
}
