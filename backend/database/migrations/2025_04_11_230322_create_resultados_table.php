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
            $table->unsignedBigInteger('idSolicitud');
            $table->unsignedInteger('totalCursosEvaluados');
            $table->unsignedInteger('totalCursosConvalidados');
            $table->unsignedInteger('totalCursosRechazados');
            $table->unsignedInteger('totalCreditosEvaluados');
            $table->unsignedInteger('totalCreditosConvalidados');
            $table->unsignedInteger('totalCreditosRechazados');
            $table->decimal('porcentajeSimilitudPromedio', 5, 2);
            $table->text('observacionesGenerales');
            $table->unsignedBigInteger('idUser');
            $table->string('responsableEvaluacion')->nullable(); // personal_name
            $table->string('cargoResponsable')->nullable(); // cargo
            $table->string('correoResponsable')->nullable(); // corporative_email
            $table->string('DNI')->nullable(); // DNI
            $table->dateTime('fechaHoraEmision')->useCurrent();

            $table->foreign('idSolicitud')->references('idSolicitud')->on('Solicitudes')->onDelete('cascade');
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Resultados');
    }
};
