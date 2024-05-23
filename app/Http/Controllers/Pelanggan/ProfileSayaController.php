<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use Illuminate\Http\Request;

class ProfileSayaController extends Controller
{
    public function index(Request $request)
    {
        $pelanggan = Pelanggan::where('user_id', $request->user()->id)->with('user')->first();

        return inertia('Pelanggan/ProfileSaya/Index', ['pelanggan' => $pelanggan]);
    }

    public function update(Request $request)
    {
        $pelanggan = Pelanggan::where('user_id', $request->user()->id)->with('user')->first();
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
        if ($request->password) {
            $request->validate([
                "password" => "required|confirmed|string|min:6",
            ]);
            $password = bcrypt($request->password);
        }
        $foto = $pelanggan->foto;
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto')->storeAs('Foto/Pelanggan', $request->file('foto')->getClientOriginalName());
        }

        $pelanggan->update([
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
