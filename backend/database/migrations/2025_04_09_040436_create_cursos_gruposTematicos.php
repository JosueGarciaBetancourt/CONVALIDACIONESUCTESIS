<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Cursos_GruposTematicos', function (Blueprint $table) {
            $table->id('idCursoGrupo');
            $table->unsignedBigInteger('idCurso');
            $table->unsignedBigInteger('idGrupoTematico');
            $table->decimal('peso', 5, 2);

            $table->foreign('idCurso')->references('idCurso')->on('Cursos')->onDelete('cascade');
            $table->foreign('idGrupoTematico')->references('idGrupoTematico')->on('GruposTematicos')->onDelete('cascade');

            $table->unique(['idCurso', 'idGrupoTematico']); // para evitar duplicados

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Cursos_GruposTematicos');
    }
};
