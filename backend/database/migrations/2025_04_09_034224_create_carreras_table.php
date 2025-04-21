<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Carreras', function (Blueprint $table) {
            $table->id('idCarrera');
            $table->string('nombre');
            /* Para estandarizar el código de una carrera se usará la siguiente estructura:
                Abreviatura_Universidad-Abreviatura_Carrera
            */
            $table->string('codigo')->unique(); //UC-ISI
            $table->string('abreviatura'); //ISI
            $table->unsignedBigInteger('idUniversidad');
            $table->foreign('idUniversidad')->references('idUniversidad')->on('Universidades');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Carreras');
    }
};
