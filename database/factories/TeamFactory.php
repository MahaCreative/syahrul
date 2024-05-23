<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $foto = ['Image/team-2.jpg', 'Image/team-3.jpg'];
        $posisi = ['video grafer', 'foto graver', 'editor', 'lightning'];
        return [
            'nama' => $name = $this->faker->name(),
            'posisi' => $posisi[rand(0, 3)],
            'foto' => $foto[rand(0, 1)],
            'deskripsi' => $this->faker->sentence(rand(30, 70)),
            'facebook_studio' => $name,
            'instagram_studio' => '@' . $name . "_" . rand(0, 18),
            'link_facebook_studio' => 'https://web.facebook.com/?locale=id_ID&_rdc=1&_rdr',
            'link_instagram_studio' => 'https://web.facebook.com/?locale=id_ID&_rdc=1&_rdr',

        ];
    }
}
