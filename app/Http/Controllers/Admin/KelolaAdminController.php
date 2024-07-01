<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfileAdmin;
use App\Models\User;
use Illuminate\Http\Request;

class KelolaAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = ProfileAdmin::query()->with('user');
        $profile = $query->latest()->get();
        return inertia('Admin/User/Index', compact('profile'));
    }

    public function create(Request $request)
    {


        $request->validate([
            "first_name" => "required|string|min:4",
            "last_name" => "nullable|min:3",
            "alamat" => "required|string|min:6",
            "no_telp" => "required|numeric|digits:12|unique:profile_admins,no_telp",
            "foto" => "nullable|image|mimes:jpg,jpeg,png,webp",
            "email" => "required|email|string|unique:users,email",
            "password" => "required|confirmed|string|min:6",
        ]);
        $foto = $request->file('foto') ? $request->file('foto')->store('ProfileAdmin') : null;
        $user = User::create([
            "name" => $request->first_name . " " . $request->last_name,
            "email" => $request->email,
            "password" => bcrypt($request->password),
        ]);
        $pelanggan = ProfileAdmin::create([
            'user_id' => $user->id,
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "alamat" => $request->alamat,
            "no_telp" => $request->no_telp,
            "foto" => $foto,
        ]);


        $user->assignRole('pelanggan');
    }
    public function update(Request $request)
    {
        $profile = ProfileAdmin::with('user')->findOrFail($request->id);
        $user = $profile->user;
        $request->validate([
            "first_name" => "required|string|min:4",
            "last_name" => "nullable|min:3",
            "alamat" => "required|string|min:6",
            "no_telp" => "required|numeric|digits:12|unique:profile_admins,no_telp," . $profile->id,
            "foto" => "nullable",
            "email" => "required|email|string|unique:users,email," . $profile->user_id,
            "password" => "nullable|string|min:6",
        ]);
        $foto = $profile->foto;
        $password = $user->password;
        if ($request->hasFile('foto')) {
            $request
                ->validate(['foto' => 'image|mimes:png,jpeg,webp,jpg']);
            $foto = $request->file('foto')->store('ProfileAdmin');
        }
        if ($request->password) {
            $request->validate(['password' => 'confirmed']);
            $password = bcrypt($request->password);
        }

        $profile->update([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "alamat" => $request->alamat,
            "no_telp" => $request->no_telp,
            "foto" => $request->foto,
        ]);
        $user->update([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'passowrd' => $password
        ]);
    }
    public function delete(Request $request)
    {
        $profile = ProfileAdmin::findORFail($request->id);
        $profile->user->delete();
        $profile->delete();
        return redirect()->back();
    }
}
