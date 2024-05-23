<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Galery;
use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function index(Request $request)
    {
        $query = Slider::query();
        $slider = $query->latest()->get();
        return inertia('Admin/Slider/Index', compact('slider'));
    }
    public function create(Request $request)
    {
        $attr = $request->validate([
            "title" => 'required|string|min:6',
            "subtitle" => 'required|string|min:30|max:100',
            "foto" => 'required|image|mimes:png,jpeg,jpg,webp',
            "position" => 'required',
            "status" => 'required',
        ]);
        $attr['foto'] = $request->file('foto')->store('Slider');
        $slider = Slider::create($attr);
        return redirect()->back();
    }
    public function update(Request $request)
    {
        $attr = $request->validate([
            "title" => 'required|string|min:6',
            "subtitle" => 'required|string|min:30|max:100',
            "foto" => 'required',
            "position" => 'required',
            "status" => 'required',
        ]);
        $slider = Slider::findOrFail($request->id);
        $attr['foto'] = $slider->foto;
        if ($request->hasFile('foto')) {
            $request->validate(['foto' => 'image|mimes:png,jpeg,jpg']);
            $attr['foto'] = $request->file('foto')->store('galery');
        }
        $slider->update($attr);
        return redirect()->back();
    }
    public function delete(Request $request)
    {

        $galery = Slider::findOrFail($request->id);
        $galery->delete();
        return redirect()->back();
    }
}
