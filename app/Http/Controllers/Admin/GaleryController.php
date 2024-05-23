<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Galery;
use Illuminate\Http\Request;

class GaleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Galery::query();
        $galery = $query->latest()->get();
        return inertia('Admin/Galery/Index', compact('galery'));
    }
    public function create(Request $request)
    {
        $attr = $request->validate([
            "nama_pelanggan" => 'required|string|min:6',
            "foto" => 'required|image|mimes:png,jpeg,jpg',
            "tanggal_foto" => 'required',
            "deskripsi" => 'required|min:50|max:500',
            "taken_by" => 'required|string|min:6',
        ]);
        $attr['foto'] = $request->file('foto')->store('galery');
        Galery::create($attr);
        return redirect()->back();
    }
    public function update(Request $request)
    {
        $attr = $request->validate([
            "nama_pelanggan" => 'required|string|min:6',
            "foto" => 'required',
            "tanggal_foto" => 'required',
            "deskripsi" => 'required|min:50|max:500',
            "taken_by" => 'required|string|min:6',
        ]);
        $attr['foto'] = $request->file('foto')->store('galery');
        $galery = Galery::findOrFail($request->id);
        $attr['foto'] = $galery->foto;
        if ($request->hasFile('foto')) {
            $request->validate(['foto' => 'image|mimes:png,jpeg,jpg']);
            $attr['foto'] = $request->file('foto')->store('galery');
        }
        $galery->update($attr);
        return redirect()->back();
    }
    public function delete(Request $request)
    {
        $galery = Galery::findOrFail($request->id);
        $galery->delete();
        return redirect()->back();
    }
}
