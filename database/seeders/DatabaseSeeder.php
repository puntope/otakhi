<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LocationSeeder::class,
            NationalitySeeder::class,
            LanguageSeeder::class,
            FacilitySeeder::class,
        ]);

        User::factory()->count(100)->create();
        Room::factory()->count(50)->create();
        $this->call([
            UserLanguageSeeder::class,
            RoomFacilitiesSeeder::class,
            RoomImagesSeeder::class,
            ConversationSeeder::class,
            MessageSeeder::class,
        ]);

    }
}
