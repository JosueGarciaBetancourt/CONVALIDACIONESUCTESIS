<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestApiController;
use App\Http\Controllers\AuthController;

// ==============================
// 📌 RUTAS PÚBLICAS
// ==============================

// Tests (solo en desarrollo)
Route::get('/test', [TestApiController::class, 'testAll'])->name('api.testAll');
Route::get('/test/{param}', [TestApiController::class, 'testParam'])->name('api.test');

// Auth
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');