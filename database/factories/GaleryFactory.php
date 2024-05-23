<?php

namespace Database\Factories;

use App\Models\Pelanggan;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Galery>
 */
class GaleryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pelanggan = Pelanggan::latest()->get();
        $team = Team::latest()->get();
        return [
            'nama_pelanggan' => $pelanggan[count($pelanggan) - 1]->first_name . " " . $pelanggan[count($pelanggan) - 1]->last_name,
            'foto' => $this->faker->imageUrl(),
            'tanggal_foto' => $this->faker->dateTimeBetween('-1 years', 'now'),
            'deskripsi' => $this->faker->sentence(rand(30, 100)),
            'taken_by' => $team[count($team) - 1]->nama,
        ];
    }
}
