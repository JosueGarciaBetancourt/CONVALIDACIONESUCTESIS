<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Mallas', function (Blueprint $table) {
            $table->id('idMalla');
            $table->unsignedBigInteger('idCarrera');
            $table->year('anio_inicio');
            $table->string('semestre_inicio'); 
            $table->string('semestre_fin')->nullable();

            $table->foreign('idCarrera')->references('idCarrera')->on('Carreras');
            
            $table->unique(['idCarrera', 'anio_inicio', 'semestre_inicio']);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Mallas');
    }
};
