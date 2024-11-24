<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id' )->constrained(); // room owner
            $table->string('address'); // room address
            $table->decimal('latitude', 10, 8)->nullable(); // Latitud (10 dígitos, 8 decimales)
            $table->decimal('longitude', 11, 8)->nullable(); // Longitud (11 dígitos, 8 decimales)
            $table->text('description')->nullable(); // room long description
            $table->decimal('price', 10, 2)->default(0)->unsigned(); // room price
            $table->decimal('deposit', 10, 2)->default(0)->unsigned(); // room deposit
            $table->decimal('size', 10, 2)->default(0)->unsigned(); // Room size in m2
            $table->boolean('has_utilities')->default( false );  // If utilities are paid by owner
            $table->boolean('is_furnished')->default( false ); // If is furnished
            $table->boolean('allows_smoking')->default( false ); // If smoking is allowed
            $table->boolean('allows_pets')->default( false );  // If pets are allowed
            $table->integer('allowed_people')->default( 1 )->unsigned();  // Max number of people per room
            $table->date('availability_date')->nullable(); // When is available for renting
            $table->integer('min_contract_months' )->default(0 )->unsigned(); // Minimum contract months ( 0 is indefinite )
            $table->enum('required_gender', [ 'male', 'female' ] )->nullable(); // Required gender for rent the room.
            $table->enum('roommates_gender', [ 'male', 'female'] )->nullable(); // Roommates gender.
            $table->integer('num_roommates')->default( 0 )->unsigned(); // Num of roommates.
            $table->timestamps();
            $table->index(['latitude', 'longitude']); // Índice combinado para búsquedas geográficas
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
