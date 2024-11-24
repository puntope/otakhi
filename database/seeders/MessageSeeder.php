<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class MessageSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Obtener todas las conversaciones
        $conversations = DB::table('conversations')->get();

        foreach ($conversations as $conversation) {
            // Obtener los usuarios de la conversación
            $userId = $conversation->user_id; // El usuario interesado
            $roomId = $conversation->room_id;

            // Obtener el propietario de la habitación (landlord)
            $landlordId = DB::table('rooms')
                ->where('id', $roomId)
                ->value('user_id');

            // Crear entre 3 y 10 mensajes por conversación
            $numMessages = $faker->numberBetween(1, 10);

            $messages = [];
            for ($i = 0; $i < $numMessages; $i++) {

                if ( $i === 0 ) {
                    $senderId = $userId;
                } else {
                    // Elegir aleatoriamente quién envía el mensaje (usuario interesado o propietario)
                    $senderId = $faker->randomElement([$userId, $landlordId]);
                }

                // Determinar si el ultimo mensaje está leído o no
                if ( $i == $numMessages - 1 ) {
                    $isRead = $faker->boolean();
                } else {
                    $isRead = true;
                }

                $messages[] = [
                    'conversation_id' => $conversation->id,
                    'user_id' => $senderId,
                    'message' => $faker->sentence(),
                    'is_read' => $isRead,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            // Insertar todos los mensajes en un solo batch para mejorar rendimiento
            DB::table('messages')->insert($messages);
        }
    }
}
