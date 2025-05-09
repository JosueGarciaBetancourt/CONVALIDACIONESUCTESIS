<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('Unidades_Sin_Par_Origen', function (Blueprint $table) {
            $table->id('idUnidadSinParOrigen');
            $table->unsignedBigInteger('idDetalleComparacion');
            $table->unsignedBigInteger('idUnidad');

            $table->foreign('idDetalleComparacion')->references('idDetalleComparacion')
                    ->on('Detalle_Comparacion')->onDelete('cascade');
            $table->foreign('idUnidad')->references('idUnidad')
                    ->on('Unidades')->onDelete('cascade');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Unidades_Sin_Par_Origen');
    }
};
