<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Silabos', function (Blueprint $table) {
            $table->id('idSilabo');
            $table->unsignedBigInteger('idCurso');
            $table->year('anio');
            $table->text('sumilla');
            $table->text('aprendizaje_general');

            $table->foreign('idCurso')->references('idCurso')
                    ->on('Cursos')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Silabos');
    }
};
