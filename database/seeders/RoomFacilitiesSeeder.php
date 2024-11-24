<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class RoomFacilitiesSeeder extends Seeder
{
    public function run()
    {
        // Obtener todas las habitaciones
        $rooms = DB::table('rooms')->pluck('id')->toArray();

        // Obtener todas las instalaciones
        $facilities = DB::table('facilities')->pluck('id')->toArray();

        // Asociar instalaciones a las habitaciones
        foreach ($rooms as $roomId) {
            // Seleccionar un número aleatorio de instalaciones (entre 1 y 5)
            $randomFacilities = Arr::random($facilities, rand(1, 5)); // De 1 a 5 instalaciones por habitación

            foreach ($randomFacilities as $facilityId) {
                // Insertar la relación entre la habitación y la instalación
                DB::table('room_facilities')->insert([
                    'room_id' => $roomId,
                    'facility_id' => $facilityId
                ]);
            }
        }
    }
}
