<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('Unidades_Sin_Par_Destino', function (Blueprint $table) {
            $table->id('idUnidadSinParDestino');
            $table->unsignedBigInteger('idDetalleComparacion');
            $table->unsignedBigInteger('idUnidad');

            $table->foreign('idDetalleComparacion')->references('idDetalleComparacion')
                    ->on('Detalle_Comparacion')->onDelete('cascade');
            $table->foreign('idUnidad')->references('idUnidad')
                    ->on('Unidades')->onDelete('cascade');

            $table->softDeletes();
            $table->timestamps();

            $table->index('idDetalleComparacion');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Unidades_Sin_Par_Destino');
    }
};
