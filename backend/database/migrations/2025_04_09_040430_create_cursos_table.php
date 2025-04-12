<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Cursos', function (Blueprint $table) {
            $table->id('idCurso');
            $table->unsignedBigInteger('idMalla');
            $table->foreign('idMalla')->references('idMalla')->on('Mallas');
            /* Para estandarizar el código de un curso se usará la siguiente estructura:
                → Cursos locales:
                    Abreviatura_Universidad-Abreviatura_Carrera-Codigo_Silabo-Anio_Silabo-Elecivo/Obligatorio
                → Cursos foráneos:
                    Abreviatura_Universidad-Abreviatura_Carrera-Codigo_Silabo-Anio_Silabo
            */
            $table->string('codigo')->unique(); //UC-ISI-ASUC00005-2015-ELECTIVO
            $table->string('nombre');
            $table->year('anio');
            $table->unsignedInteger('creditos'); 
            $table->unsignedInteger('horas_teoria')->nullable();  
            $table->unsignedInteger('horas_practica')->nullable(); 
            $table->unsignedInteger('horas_teoricoPracticas'); // En algunos sílabos solo aparece este valor
            $table->boolean('fueComparado')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Cursos');
    }
};
