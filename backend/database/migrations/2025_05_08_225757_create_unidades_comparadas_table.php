<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('Unidades_Comparadas', function (Blueprint $table) {
            $table->id('idUnidadesComparadas');
            $table->unsignedBigInteger('idDetalleComparacion');
            $table->unsignedBigInteger('idUnidadOrigen'); 
            $table->unsignedBigInteger('idUnidadDestino'); 
            $table->decimal('similitud_ponderada', 5, 2);
            $table->decimal('similitud_titulo', 5, 2);
            $table->decimal('similitud_aprendizaje', 5, 2);
            $table->decimal('similitud_temas', 5, 2);
         
            $table->foreign('idDetalleComparacion')->references('idDetalleComparacion')
                    ->on('Detalle_Comparacion')->onDelete('cascade');
            $table->foreign('idUnidadOrigen')->references('idUnidad')
                    ->on('Unidades')->onDelete('cascade');
            $table->foreign('idUnidadDestino')->references('idUnidad')
                    ->on('Unidades')->onDelete('cascade');
                  
            $table->softDeletes();
            $table->timestamps();

            $table->index('idDetalleComparacion');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Unidades_Comparadas');
    }
};
