<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Comparaciones', function (Blueprint $table) {
            $table->id('idComparacion');
            $table->unsignedBigInteger('idSolicitud')->unique();
            $table->unsignedBigInteger('idCursoOrigen'); 
            $table->unsignedBigInteger('idCursoDestino'); 
            $table->datetime('fechaHora')->useCurrent(); 
            $table->float('porcentaje_similitud'); 
            $table->boolean('resultado'); 
            $table->text('justificacion'); 

            $table->foreign('idSolicitud')->references('idSolicitud')->on('Solicitudes')->onDelete('cascade');
            $table->foreign('idCursoOrigen')->references('idCurso')->on('Cursos')->onDelete('cascade');
            $table->foreign('idCursoDestino')->references('idCurso')->on('Cursos')->onDelete('cascade');

            $table->index('idCursoOrigen');
            $table->index('idCursoDestino');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Comparaciones');
    }
};
