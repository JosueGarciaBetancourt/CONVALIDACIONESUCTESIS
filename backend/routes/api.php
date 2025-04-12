<?php

use Illuminate\Support\Facades\Route;

// Rutas públicas
require __DIR__.'/api_public.php';

//Rutas privadas con su middleware
Route::middleware('auth:sanctum')->group(function () {
    require __DIR__.'/api_private.php';
});
