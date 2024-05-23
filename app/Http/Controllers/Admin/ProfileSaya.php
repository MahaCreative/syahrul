<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfileAdmin;
use Illuminate\Http\Request;

class ProfileSaya extends Controller
{
    public function index(Request $request)
    {
        $admin = ProfileAdmin::where('user_id', $request->user()->id)->with('user')->first();

        return inertia('Admin/ProfileSaya/Index', compact('admin'));
    }
    public function update(Request $request)
    {

        $user = $request->user();
        $password = $user->password;
        $request->validate([
            "first_name" => "required|string|min:4",
            "last_name" => "nullable|min:3",
            "alamat" => "required|string|min:20",
            "no_telp" => "required|numeric|digits:12",
            "foto" => "nullable|image|mimes:jpg,jpeg,png,webp",
            "email" => "required|email|string",
            "password" => "nullable|confirmed|string|min:6",
        ]);
        $profile = ProfileAdmin::where('user_id', $request->user()->id)->with('user')->first();
        if ($request->password) {
            $request->validate([
                "password" => "required|confirmed|string|min:6",
            ]);
            $password = bcrypt($request->password);
        }
        $foto = $profile->foto;
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto')->storeAs('Foto/Pelanggan', $request->file('foto')->getClientOriginalName());
        }

        $profile->update([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "alamat" => $request->alamat,
            "no_telp" => $request->no_telp,
            "foto" => $foto,
        ]);
        $user->update([
            "email" => $request->email,
            "password" => $password,
            'name' => $request->first_name . ' ' . $request->last_name,
        ]);
    }
}
