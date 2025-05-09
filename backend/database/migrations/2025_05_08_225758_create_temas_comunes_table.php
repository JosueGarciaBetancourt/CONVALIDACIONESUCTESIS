<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('Temas_Comunes', function (Blueprint $table) {
            $table->id('idTemaComun');
            $table->unsignedBigInteger('idUnidadesComparadas');
            $table->string('tema');

            $table->foreign('idUnidadesComparadas')->references('idUnidadesComparadas')
                    ->on('Unidades_Comparadas')->onDelete('cascade');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Temas_Comunes');
    }
};
