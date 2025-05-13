<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('GruposTematicos', function (Blueprint $table) {
            $table->id('idGrupoTematico');
            $table->string('nombre'); 
            $table->string('descripcion')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('GruposTematicos');
    }
};
