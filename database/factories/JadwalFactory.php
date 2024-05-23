<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jadwal>
 */
class JadwalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_paket' => $this->faker->name(),
            "lokasi" => $this->faker->address(),
            "tanggal_foto" => $this->faker->date(),
            "jam_foto" => "00:00:00",
            "catatan" => $this->faker->sentence(),
            "judul_jadwal" => $this->faker->sentence(),
            "nam_pelanggan" => $this->faker->name(),
            "kontak_pelanggan" => $this->faker->phoneNumber(),
        ];
    }
}
