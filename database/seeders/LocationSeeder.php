<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
            $slug = Str::kebab( $country );
            DB::table('countries')->insert(['name' => $country, "slug" => $slug ] );
            $country_id = (int) DB::table('countries')->where( 'slug', $slug )->value('id');

            foreach ( $cities as $city => $districts ) {
                $slug = Str::kebab( $city );
                DB::table('cities')->insert(['name' => $city, 'slug' => $slug, 'country_id' => $country_id ] );
                $city_id = (int) DB::table('cities')->where( 'slug', $slug )->value('id');

                foreach ( $districts as $district => $neighbourhoods ) {
                    $slug = Str::kebab( $district );
                    DB::table('districts')->insert(['name' => $district, 'city_id' => $city_id, 'slug' => $slug ] );
                    $district_id = (int) DB::table('districts')->where( 'slug', $slug )->value('id');

                    foreach ( $neighbourhoods as $neighbourhood  ) {
                        $slug = Str::kebab( $neighbourhood );
                        DB::table('neighbourhoods')->insert(['name' => $neighbourhood, 'district_id' => $district_id, 'slug' => $slug ] );
                    }
                }
            }
        }
    }
}
