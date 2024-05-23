<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paket>
 */
class PaketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $lokasi = ['outdor', 'studio'];
        return [
            "nama_paket" => $this->faker->sentence(5),
            "lokasi_foto" => $lokasi[rand(0, 1)],
            "deskripsi_paket" => $this->faker->sentence(10, 50),
            "harga_paket" => rand(100000, 5000000),
            "catatan_paket" => $this->faker->sentence(5),
        ];
    }
}
