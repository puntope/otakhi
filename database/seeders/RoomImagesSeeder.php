<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomImagesSeeder extends Seeder
{

    protected $unsplashService;

    public function run()
    {
        $images = [
            "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE4OTh8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1489630114164-dbd774c5a337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE4OTl8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1650137953679-0fe3b3985aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE4OTl8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE4OTl8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1551806406-3d0835050227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE4OTl8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1621891334481-5c14b369d9d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDB8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1621891334481-5c14b369d9d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDB8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1627484819540-40a871c972ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDB8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1519412373454-49c4308ca680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDB8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1533090368676-1fd25485db88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDF8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1588613877464-207a2d7e9b42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDF8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1653971858332-bf68a22f7e22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDF8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1654064550858-c62b971a378a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDF8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1533090368676-1fd25485db88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDF8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1551806405-b76c7789f4ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDJ8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1585128792103-0b591f96512e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDJ8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDJ8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1612293682996-544ebfb4cbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDJ8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1438954936179-786078772609?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDN8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1653928072841-a7160fcf19ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDN8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1507138451611-3001135909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDN8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1655988940601-7702d8685f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDN8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1551806235-a05dd14a54c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDR8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1475584681345-8503b2f13841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDR8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1655988940601-7702d8685f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDR8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1581404501824-b69dfb89f64c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDR8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1560448075-bb485b067938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDR8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDV8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1599243272864-e9dd455966bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDV8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1444201983204-c43cbd584d93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDV8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1619221891415-e5ec4890da3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDV8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1654064550858-c62b971a378a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDZ8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1653972233597-05822baa3c4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDZ8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1621891334481-5c14b369d9d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDZ8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1551806406-3d0835050227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDZ8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1504624720567-64a41aa25d70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDZ8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1529408632839-a54952c491e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDd8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1562368764-651b0bba96af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDd8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDd8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1650137269022-cbeaf3274bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDd8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1612293682996-544ebfb4cbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDh8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDh8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDh8&ixlib=rb-4.0.3&q=80&w=800&h=600
","https://images.unsplash.com/photo-1551806136-5062b4d5f6a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODQxMDF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM1OTE5MDh8&ixlib=rb-4.0.3&q=80&w=800&h=600"
        ];

        // Obtener todas las habitaciones
        $rooms = DB::table('rooms')->pluck('id')->toArray();

        // Asignar imágenes aleatorias a las habitaciones
        foreach ($rooms as $roomId) {
            // Generar un número aleatorio de imágenes para cada habitación (entre 1 y 5)
            $numImages = rand(1, 5);
            $mainImageIndex = rand(0, $numImages - 1); // Seleccionamos aleatoriamente la imagen principal

            for ($i = 0; $i < $numImages; $i++) {
                $imageUrl = $images[ rand(0, count($images) -  1) ];
                DB::table('room_images')->insert([
                    'room_id' => $roomId,
                    'image_path' => $imageUrl,
                    'is_main' => $mainImageIndex === $i
                ]);
            }
        }
    }
}
