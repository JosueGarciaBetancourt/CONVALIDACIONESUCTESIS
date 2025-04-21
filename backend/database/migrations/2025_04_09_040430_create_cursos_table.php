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
            /* Para estandarizar el código de un curso se usará la siguiente estructura:
                → Cursos locales:
                    Abreviatura_Universidad-Abreviatura_Carrera-Codigo_Silabo-Anio_Silabo-Electivo/Obligatorio
                → Cursos foráneos:
                    Abreviatura_Universidad-Abreviatura_Carrera-Codigo_Silabo-Anio_Silabo
            */
            $table->string('codigo')->unique()->nullable(); //UC-ISI-ASUC00005-2015-ELECTIVO, luego de insertar los datos del sílabo se llena automáticamente
            $table->string('nombre');
            $table->boolean('fueComparado')->default(false);
            
            $table->foreign('idMalla')->references('idMalla')->on('Mallas');
            $table->index('idMalla');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Cursos');
    }
};
