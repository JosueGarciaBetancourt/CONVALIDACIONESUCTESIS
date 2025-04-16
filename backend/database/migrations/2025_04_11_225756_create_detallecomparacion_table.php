<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Detalle_Comparacion', function (Blueprint $table) {
            $table->id('idDetalleComparacion');
            $table->unsignedBigInteger('idComparacion');
            $table->float('similitud_sumilla');
            $table->float('similitud_aprendizajes');
            $table->float('similitud_unidades');
            $table->float('similitud_bibliografia');
                     
            $table->foreign('idComparacion')->references('idComparacion')
                    ->on('Comparaciones')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Detalle_Comparacion');
    }
};
