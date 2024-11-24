<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ConversationSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Obtener todos los IDs de usuarios que no son propietarios de habitaciones
        $users = DB::table('users')
            ->whereNotIn('id', DB::table('rooms')->pluck('user_id'))
            ->pluck('id')
            ->toArray();

        $rooms = DB::table('rooms')->pluck('id')->toArray();

        $usedCombinations = []; // Para almacenar combinaciones únicas

        foreach ($rooms as $roomId) {
            // Número aleatorio de conversaciones por habitación
            $numConversations = $faker->numberBetween(0, 5);

            for ($i = 0; $i < $numConversations; $i++) {
                // Seleccionar un usuario aleatorio que no sea el propietario de la habitación
                do {
                    $userId = $faker->randomElement($users);
                    $combination = $roomId . '-' . $userId;
                } while (
                    in_array($combination, $usedCombinations) || // Evitar duplicados
                    DB::table('rooms')->where('id', $roomId)->value('user_id') == $userId // Evitar que el propietario cree conversaciones con su propia habitación
                );

                // Almacenar la combinación como usada
                $usedCombinations[] = $combination;

                // Crear la conversación
                DB::table('conversations')->insert([
                    'room_id' => $roomId,
                    'user_id' => $userId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
