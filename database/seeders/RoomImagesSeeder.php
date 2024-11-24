<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class RoomImagesSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Obtener todas las habitaciones
        $rooms = DB::table('rooms')->pluck('id')->toArray();

        // Asignar imágenes aleatorias a las habitaciones
        foreach ($rooms as $roomId) {
            // Generar un número aleatorio de imágenes para cada habitación (entre 1 y 5)
            $numImages = rand(1, 5);
            $mainImageIndex = rand(0, $numImages - 1); // Seleccionamos aleatoriamente la imagen principal

            for ($i = 0; $i < $numImages; $i++) {
                $imageUrl = 'https://source.unsplash.com/800x600/?room';
                DB::table('room_images')->insert([
                    'room_id' => $roomId,
                    'image_path' => $imageUrl,
                    'is_main' => $mainImageIndex === $i
                ]);
            }
        }
    }
}
