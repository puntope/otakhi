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
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete(); // Relación con la habitación
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // Usuario que inicia la conversación (inquilino)
            $table->timestamps();

            // Índice único para evitar duplicar conversaciones entre el mismo usuario y habitación
            $table->unique(['room_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};
