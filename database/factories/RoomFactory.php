<?php

namespace Database\Factories;

use App\Models\Neighbourhood;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? 1,
            'neighbourhood_id' => Neighbourhood::inRandomOrder()->first()->id ?? 1,
            'address' => $this->faker->address,
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 100, 1000),
            'deposit' => $this->faker->randomFloat(2, 0, 500),
            'size' => $this->faker->numberBetween(10, 50),
            'has_guard' => $this->faker->boolean,
            'has_parking' => $this->faker->boolean,
            'has_utilities' => $this->faker->boolean,
            'is_furnished' => $this->faker->boolean,
            'allows_smoking' => $this->faker->boolean,
            'allows_pets' => $this->faker->boolean,
            'allowed_people' => $this->faker->numberBetween(1, 2),
            'availability_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'min_contract_months' => $this->faker->randomElement([0, 1, 3, 6, 12]),
            'required_gender' => $this->faker->randomElement(['male', 'female', null]),
            'roommates_gender' => $this->faker->randomElement(['male', 'female', null]),
            'building_status' => $this->faker->randomElement(['old', 'new' , 'old-renovated']),
            'floor' => $this->faker->numberBetween(1, 16),
            'num_bathrooms' => $this->faker->numberBetween(1, 3),
            'num_roommates' => $this->faker->numberBetween(0, 5),
        ];
    }
}
