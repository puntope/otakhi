<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FacilitySeeder extends Seeder
{
    public function run()
    {
        $facilities = [ 'Concierge' => 'Security concierge available in the building', 'Parking' => 'The building has their own parking for guests', 'Elevator' => 'The building has an elevator', 'Internet' => 'This room has access to the shared WiFi in the house.', 'Private Bathroom' => 'The room provides its own private bathroom', 'Balcony' => 'The room has its own balcony', 'Heater' => 'The room counts with a heater', 'Private Kitchen' => 'THe room has its own private kitchen', 'Aircon' => 'The room provides air condition system' ];


        foreach ($facilities as $facility => $description ) {
            DB::table('facilities')->insert(['name' => $facility, 'description' => $description ]);
        }
    }
}
