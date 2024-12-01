<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    public function run()
    {
        $locations = [
            "Georgia" => [ "Tbilisi" => [
                "Didube-Chugureti" => ['Didube', 'Digomi', 'Kukia', 'Svanetis Ubani', 'Chugureti'],
                "Gldani-Nadzaladevi" => ['Avchala', 'Gldani', 'Gldanula', 'Zahesi', 'Tbilisi Sea', 'Temqa', 'Koniaki Village', 'Lotkini', 'Mukhiani', 'Nadzaladevi', 'Sanzona', 'Gldani Village', 'Ivertubani'],
                "Isani-Samgori" => [ 'Airport Village', 'Dampalo Village', 'Vazisubani', 'Varketili', 'Isani', 'Lilo', 'Mesame Masivi', 'Ortachala', 'Orkhevi', 'Samgori', 'Ponichala', 'Airport', 'Afrika', 'Navtlugi'],
                "Vake-Saburtalo" => [ 'Nutsubidze Plateau', 'Saburtalo', 'Digomi Village', 'Vazha-Pshavela', 'Lisi Lake', 'Turtle Lake', 'Bagebi', 'Didi Digomi', 'Digomi 1-9', 'Vake', 'Vashlijvari', 'Vedzisi', 'Tkhinvali'],
                "Old Tbilisi" => ['Abanotubani', 'Avlabari', 'Elia', 'Vera', 'Mtatsminda', 'Sololaki'],
            ] ]  // georgia
        ];


        foreach ($locations as $country => $cities) {
            DB::table('countries')->insert(['name' => $country ] );
            $country_id = (int) DB::table('countries')->where( 'name', $country )->value('id');

            foreach ( $cities as $city => $districts ) {
                DB::table('cities')->insert(['name' => $city, 'country_id' => $country_id ] );
                $city_id = (int) DB::table('cities')->where( 'name', $city )->value('id');

                foreach ( $districts as $district => $neighbourhoods ) {
                    DB::table('districts')->insert(['name' => $district, 'city_id' => $city_id ] );
                    $district_id = (int) DB::table('districts')->where( 'name', $district )->value('id');

                    foreach ( $neighbourhoods as $neighbourhood  ) {
                        DB::table('neighbourhoods')->insert(['name' => $neighbourhood, 'district_id' => $district_id ] );
                    }

                }
            }
        }
    }
}
