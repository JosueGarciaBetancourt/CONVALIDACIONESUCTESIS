<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Detalle_Convalidacion', function (Blueprint $table) {
            $table->id('idDetalleConvalidacion');
            $table->unsignedBigInteger('idConvalidacion');
            $table->float('similitud_sumilla');
            $table->float('similitud_aprendizajes');
            $table->float('similitud_unidades');
            $table->float('similitud_bibliografia');
                     
            $table->foreign('idConvalidacion')->references('idConvalidacion')
                    ->on('Convalidaciones')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Detalle_Convalidacion');
    }
};
