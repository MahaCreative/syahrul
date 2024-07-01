<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class ProfileStudio extends Controller
{
    public function index(Request $request)
    {
        $setting = Setting::first();
        return inertia('Admin/ProfileStudio/Index', compact('setting'));
    }

    public function update(Request $request)
    {
        $attr = $request->validate([
            "nama_studio" => 'required|string|min:10|max:50',
            "tagline" => 'required|min:6|max:200',
            "foto_studio" => 'required',
            "alamat_studio" => 'required|min:6|max:200',
            "telp_studio" => 'required|numeric|digits:12',
            "email_studio" => 'required|email',
            "facebook_studio" => 'required',
            "instagram_studio" => 'required',
            "link_facebook_studio" => 'required',
            "link_instagram_studio" => 'required',
            "deskripsi_studio" => 'required|min:6|max:5000',
        ]);
        $profile = Setting::first();
        $attr['foto_studio'] = $profile->foto_studio;
        if ($request->hasFile('foto_studio')) {
            $request->validate(['foto_stuio' => 'image|mimes:jpg,jpeg,png']);
            $attr['foto_studio'] = $request->file('foto_studio')->store('foto_studio');
        }
        $profile->update($attr);
    }
}
