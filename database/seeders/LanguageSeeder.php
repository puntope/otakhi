<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguageSeeder extends Seeder
{
    public function run()
    {
        $languages = [
            "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Azerbaijani",
            "Belarusian", "Bengali", "Bosnian", "Bulgarian", "Burmese", "Chinese",
            "Croatian", "Czech", "Danish", "Dutch", "English", "Estonian", "Finnish",
            "French", "Georgian", "German", "Greek", "Gujarati", "Hebrew", "Hindi",
            "Hungarian", "Icelandic", "Igbo", "Indonesian", "Irish", "Italian", "Japanese",
            "Javanese", "Kannada", "Kazakh", "Khmer", "Korean", "Kurdish", "Kyrgyz",
            "Lao", "Latvian", "Lithuanian", "Macedonian", "Malay", "Malayalam",
            "Maltese", "Mongolian", "Nepali", "Norwegian", "Pashto", "Persian",
            "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", "Serbian",
            "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Swahili",
            "Swedish", "Tamil", "Telugu", "Thai", "Turkish", "Turkmen", "Ukrainian",
            "Urdu", "Uzbek", "Vietnamese", "Welsh", "Xhosa", "Yoruba", "Zulu"
        ];


        foreach ($languages as $name) {
            DB::table('languages')->insert(['name' => $name ]);
        }
    }
}
