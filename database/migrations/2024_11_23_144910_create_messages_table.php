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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->cascadeOnDelete(); // Relación con la conversación
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // Usuario que envía el mensaje
            $table->text('message'); // Contenido del mensaje
            $table->boolean('is_read')->default(false); // Indica si el mensaje fue leído
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
