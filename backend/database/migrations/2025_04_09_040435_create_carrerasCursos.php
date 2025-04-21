<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('CarrerasCursos', function (Blueprint $table) {
            $table->id('idCarreraCurso');
            $table->unsignedBigInteger('idCarrera');
            $table->unsignedBigInteger('idCurso');

            $table->foreign('idCarrera')->references('idCarrera')->on('Carreras')->onDelete('cascade');
            $table->foreign('idCurso')->references('idCurso')->on('Cursos')->onDelete('cascade');
            
            $table->unique(['idCarrera', 'idCurso']); // para evitar duplicados

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('CarrerasCursos');
    }
};
