<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Slider>
 */
class SliderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $position = ['center', 'left', 'right'];
        return [
            'title' => $this->faker->sentence(3),
            'subtitle' => $this->faker->sentence(30),
            'foto' => $this->faker->imageUrl(),
            'position' => $position[rand(0, 2)],
            'status' => 'ya',
        ];
    }
}
