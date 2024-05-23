<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Galery;
use App\Models\Jadwal;
use App\Models\Paket;
use App\Models\ProfileAdmin;
use App\Models\Slider;
use App\Models\Team;
use App\Models\UlasanStudio;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'super-admin', 'guard_name' => 'web']);
        Role::create(['name' => 'admin', 'guard_name' => 'web']);
        Role::create(['name' => 'pelanggan', 'guard_name' => 'web']);
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
        $this->call([
            SettingSeeder::class

        ]);

        // $userF->assignRole('admin');
        User::factory(100)->hasPelanggan()->create();
        User::factory(100)->hasProfile()->create();

        Slider::factory(5)->create();
        Paket::factory(10)->create();
        UlasanStudio::factory(1)->create();
        Team::factory(4)->create();
        Galery::factory(100)->create();
        Jadwal::factory(100)->create();
    }
}
