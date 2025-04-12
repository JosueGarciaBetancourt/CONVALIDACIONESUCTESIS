<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Resultados', function (Blueprint $table) {
            $table->id('idResultado');
            $table->unsignedBigInteger('idConvalidacion');
            $table->unsignedInteger('totalCursosEvaluados');
            $table->unsignedInteger('totalCursosAprobados');
            $table->unsignedInteger('totalCursosRechazados');
            $table->unsignedInteger('totalCreditosConvalidados');
            $table->float('porcentaje_similitud');
            $table->text('observacionesGenerales');
            $table->string('responsableEvaluacion');
            $table->string('cargoResponsable');
            $table->string('correoResponsable');
            $table->string('firmaResponsable');
            $table->string('cargoFirmante');
            $table->dateTime('fechaHoraEmision')->useCurrent();

            $table->foreign('idConvalidacion')->references('idConvalidacion')
                    ->on('Convalidaciones')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Resultados');
    }
};
