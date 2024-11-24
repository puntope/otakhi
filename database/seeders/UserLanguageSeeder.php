<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserLanguageSeeder extends Seeder
{
    public function run()
    {
        $users = DB::table('users')->pluck('id'); // Obtener todos los IDs de usuarios
        $languages = DB::table('languages')->pluck('id'); // Obtener todos los IDs de idiomas

        foreach ($users as $userId) {
            // Número de idiomas que habla cada usuario (aleatorio entre 1 y 5)
            $numLanguages = rand(1, 5);

            // Seleccionar idiomas aleatorios para el usuario
            $userLanguages = $languages->random($numLanguages);

            foreach ($userLanguages as $languageId) {
                DB::table('user_languages')->insert([
                    'user_id' => $userId,
                    'language_id' => $languageId
                ]);
            }
        }
    }
}
