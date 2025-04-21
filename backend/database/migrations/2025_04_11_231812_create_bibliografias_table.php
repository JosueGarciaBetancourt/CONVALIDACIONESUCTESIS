<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Bibliografias', function (Blueprint $table) {
            $table->id('idBibliografia');
            $table->unsignedBigInteger('idSilabo');
            $table->string('referencia');
            $table->string('url');

            $table->foreign('idSilabo')->references('idSilabo')
                    ->on('Silabos')->onDelete('cascade');
            
            $table->unique(['idSilabo', 'referencia', 'url']);
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Bibliografias');
    }
};
