<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UlasanStudio>
 */
class UlasanStudioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $konfirm = ['menunggu konfirmasi', 'di terima', 'di tolak'];
        return [
            'ulasan' => $this->faker->sentence(rand(50, 100)),
            'kofirmasi_ulasan' => $konfirm[rand(0, 2)],
            "nama"  => $this->faker->name(),
            "rating"  => rand(1, 5),
        ];
    }
}
