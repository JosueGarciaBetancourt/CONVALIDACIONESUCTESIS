<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('temas_comunes', function (Blueprint $table) {
            $table->id('idTemaComun');

            $table->foreignId('idUnidadesComparadas')->constrained('Unidades_Comparadas', 'idUnidadesComparadas')
                  ->onDelete('cascade');

            $table->string('tema', 100);

            $table->softDeletes();
            $table->timestamps();

            $table->index('idUnidadesComparadas');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('temas_comunes');
    }
};
