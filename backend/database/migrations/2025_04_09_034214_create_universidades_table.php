<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Universidades', function (Blueprint $table) {
            $table->id('idUniversidad'); 
            $table->string('nombre')->unique();
            $table->string('abreviatura')->unique();
            $table->string('region');
            $table->string('ciudad');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Universidades');
    }
};
