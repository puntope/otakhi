<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIntroGenderNationalityToUsersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->text('intro')->nullable(); // Breve descripción del usuario
            $table->enum('gender', ['male', 'female']); // Género
            $table->foreignId( 'nationality_id' )->default(1)->constrained('nationalities')->cascadeOnDelete(); // Nacionalidad
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('intro');
            $table->dropColumn('gender');
            $table->dropForeign(['nationality_id']);
            $table->dropColumn('nationality_id');
        });
    }
}

