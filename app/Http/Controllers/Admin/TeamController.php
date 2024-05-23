<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index(Request $request)
    {
        $query = Team::query();
        $team = $query->latest()->get();

        return inertia('Admin/Team/Index', compact('team'));
    }
    public function create(Request $request)
    {

        $attr = $request
            ->validate([
                "nama" => 'required|string|min:6',
                "posisi" => 'required|string',
                "foto" => 'required|image|mimes:jpg,jpeg,png',
                "deskripsi" => 'required|string|min:50|max:350',
                "facebook_studio" => 'nullable',
                "instagram_studio" => 'nullable',
                "link_facebook_studio" => 'nullable',
                "link_instagram_studio" => 'nullable',
            ]);
        $attr['foto'] = $request->file('foto')->store('Team');
        Team::create($attr);
    }
    public function update(Request $request)
    {
        $attr = $request
            ->validate([
                "nama" => 'required|string|min:6',
                "posisi" => 'required|string',
                "foto" => 'nullable',
                "deskripsi" => 'required|string|min:50|max:350',
                "facebook_studio" => 'nullable',
                "instagram_studio" => 'nullable',
                "link_facebook_studio" => 'nullable',
                "link_instagram_studio" => 'nullable',
            ]);
        $team = Team::findOrFail($request->id);
        $attr['foto'] = $team->foto;
        if ($request->hasFile('foto')) {
            $request->validate(['foto' => 'image|mimes:jpg,jpeg,png']);
            $attr['foto'] = $request->file('foto')->store('Team');
        }


        $team->update($attr);
    }
    public function delete(Request $request)
    {
        $team = Team::findOrFail($request->id);
        $team->delete();
        return redirect()->back();
    }
}
