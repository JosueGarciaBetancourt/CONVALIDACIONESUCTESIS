<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Unidades', function (Blueprint $table) {
            $table->id('idUnidad');
            $table->unsignedBigInteger('idSilabo');
            $table->unsignedInteger('numero');
            $table->string('titulo');
            // Estandarizar → 24h ó Inicio: 2015-08-24 Termino: 2015-09-25 ó Semana 1, 2, 3, 4 y 5
            $table->string('duracion_semanas'); 
            $table->text('aprendizajes');
            $table->text('temas');

            $table->foreign('idSilabo')->references('idSilabo')
                    ->on('Silabos')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Unidades');
    }
};
