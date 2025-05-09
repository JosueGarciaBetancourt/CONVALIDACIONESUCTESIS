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
            $table->unsignedBigInteger('idComparacion')->unique();
            $table->decimal('similitud_sumilla', 5, 2);
            $table->decimal('similitud_aprendizajes', 5, 2);
            $table->decimal('similitud_unidades', 5, 2);
            $table->decimal('similitud_bibliografia', 5, 2);

            $table->foreign('idComparacion')->references('idComparacion')->on('Comparaciones')->onDelete('cascade');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Detalle_Comparacion');
    }
};
