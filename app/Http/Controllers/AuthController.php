<?php

namespace App\Http\Controllers;

use App\Models\Pelanggan;
use App\Models\ProfileAdmin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        return inertia('Pelanggan/Register');
    }

    public function store_register(Request $request)
    {
        $request->validate([
            "first_name" => "required|string|min:4",
            "last_name" => "nullable|min:3",
            "alamat" => "required|string|min:6",
            "no_telp" => "required|numeric|digits:12",
            "foto" => "nullable",
            "email" => "required|email|string|unique:users,email",
            "password" => "required|confirmed|string|min:6",
        ]);
        if ($request->hasFile('foto')) {
            $request->validate(['foto' => 'image|mimes:jpg,jpeg,png,webp']);
        }
        $foto = $request->file('foto') ? $request->file('foto')->store('Foto/Pelanggan') : 'Image/default_foto.jpg';
        $user = User::create([
            "name" => $request->first_name . " " . $request->last_name,
            "email" => $request->email,
            "password" => bcrypt($request->password),
        ]);
        $pelanggan = Pelanggan::create([
            'user_id' => $user->id,
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "alamat" => $request->alamat,
            "no_telp" => $request->no_telp,
            "foto" => $foto,
        ]);


        $user->assignRole('pelanggan');
        Auth::login($user);
        return redirect()->route("home");
    }
    public function login(Request $request)
    {
        $user = User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123123'),

        ]);
        $profileAdmin = ProfileAdmin::create([
            'user_id' => $user->id,
            "first_name" => 'Admin',
            "alamat" => 'Jl Diponegoro Mamuju',
            "no_telp" => '082194255717',
        ]);
        $user->assignRole('super-admin');
        return inertia('Pelanggan/Login');
    }

    public function store_login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            // Jika otentikasi berhasil, redirect ke halaman yang ditentukan
            return redirect()->route('home');
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
    }
}
