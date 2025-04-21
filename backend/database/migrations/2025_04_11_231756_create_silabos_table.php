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
            $table->string('codigo'); // ASUC00112 u otro código que aparece en el sílabo
            $table->year('anio');
            $table->enum('caracter', ['Electivo', 'Obligatorio'])->nullable(); // Solo para sílabos de la UC
            $table->unsignedInteger('creditos'); 
            $table->unsignedInteger('horas_teoria')->nullable();  
            $table->unsignedInteger('horas_practica')->nullable(); 
            $table->unsignedInteger('horas_teoricoPracticas'); // En algunos sílabos solo aparece este valor
            $table->text('sumilla');
            $table->text('aprendizaje_general');    

            $table->foreign('idCurso')->references('idCurso')
                    ->on('Cursos')->onDelete('cascade');
                    
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Silabos');
    }
};
