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
        Schema::create('room_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete(); // Relación con rooms
            $table->string('image_path'); // Ruta o URL de la imagen
            $table->boolean('is_main')->default(false); // Indica si es la imagen principal

            // Índice para optimizar búsquedas
            $table->index(['room_id', 'is_main']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_images');
    }
};
