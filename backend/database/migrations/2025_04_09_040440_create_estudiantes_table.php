<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Estudiantes', function (Blueprint $table) {
            $table->id('idEstudiante');
            $table->string('DNI', 8)->unique();
            $table->string('nombre'); 
            $table->string('apellido'); 
            $table->string('email')->unique(); 
            $table->string('celular')->nullable(); 
            $table->unsignedBigInteger('idCarreraOrigen');
            $table->unsignedBigInteger('idUniversidadOrigen');
        
            $table->foreign('idCarreraOrigen')->references('idCarrera')->on('Carreras');
            $table->foreign('idUniversidadOrigen')->references('idUniversidad')->on('Universidades');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Estudiantes');
    }
};
