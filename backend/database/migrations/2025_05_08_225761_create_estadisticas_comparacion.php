<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('Estadisticas_Detalle_Comparacion', function (Blueprint $table) {
            $table->id('idEstadisticasDetalleComparacion');
            $table->unsignedBigInteger('idDetalleComparacion');
            
            // Estadísticas básicas de unidades
            $table->integer('total_unidades_origen');
            $table->integer('total_unidades_destino');
            $table->integer('total_unidades_emparejadas');
            $table->decimal('porcentaje_emparejamiento_unidades', 5, 2);
            
            // Estadísticas de contenido
            $table->integer('total_temas_comunes');
            
            // Métricas del proceso de comparación
            $table->integer('tiempo_procesamiento_ms');
        
            $table->foreign('idDetalleComparacion')->references('idDetalleComparacion')
                    ->on('Detalle_Comparacion')->onDelete('cascade');
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Estadisticas_Detalle_Comparacion');
    }
};