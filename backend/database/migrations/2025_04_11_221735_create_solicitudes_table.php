<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Solicitudes', function (Blueprint $table) {
            $table->id('idSolicitud');
            // El código es el id con el térmio SOLI, ejemplo: SOLI-0001
            $table->string('codigo')->unique();
            $table->unsignedBigInteger('idEstudiante'); 
            $table->unsignedBigInteger('idCarreraDestino'); 
            $table->datetime('fechaHora')->useCurrent(); 
            $table->unsignedBigInteger('idUsuarioEvaluador'); 

            $table->foreign('idEstudiante')->references('idEstudiante')->on('Estudiantes');
            $table->foreign('idCarreraDestino')->references('idCarrera')->on('Carreras');
            $table->foreign('idUsuarioEvaluador')->references('id')->on('users');
            
            $table->index('codigo');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Solicitudes');
    }
};
