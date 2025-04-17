<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UniversidadController;
use App\Http\Controllers\CarreraController;
use App\Http\Controllers\EstudianteController;

// ==============================
// 🔒 RUTAS PROTEGIDAS (requieren token Sanctum)
// ==============================

// Dashboard protegido
Route::get('/dashboard', [TestApiController::class, 'dashboard']);

// Logout
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Users
Route::get('/users', [UserController::class, 'getUsers'])->name('getUsers');
Route::get('/users/{id}', [UserController::class, 'getUser'])->name('getUser');
Route::get('/users-trashed', [UserController::class, 'getTrashedUsers'])->name('getTrashedUsers');
Route::get('/users/{id}/trashed', [UserController::class, 'getTrashedUser'])->name('getTrashedUser');
Route::post('/users', [UserController::class, 'createUser'])->name('createUser');
Route::put('/users/{id}', [UserController::class, 'updateUser'])->name('updateUser');
Route::delete('/users/{id}/disable', [UserController::class, 'disableUser'])->name('disableUser');
Route::post('/users/{id}/enable', [UserController::class, 'enableUser'])->name('enableUser');
Route::delete('/users/{id}/delete', [UserController::class, 'deleteUser'])->name('deleteUser');

// Universidades
Route::get('/universidades', [UniversidadController::class, 'getUniversidades'])->name('getUniversidades');
Route::get('/universidades/{idUniversidad}', [UniversidadController::class, 'getUniversidad'])->name('getUniversidad');
Route::get('/universidades-trashed', [UniversidadController::class, 'getTrashedUniversidades'])->name('getTrashedUniversidades');
Route::get('/universidades/{idUniversidad}/trashed', [UniversidadController::class, 'getTrashedUniversidad'])->name('getTrashedUniversidad');
Route::post('/universidades', [UniversidadController::class, 'createUniversidad'])->name('createUniversidad');
Route::put('/universidades/{idUniversidad}', [UniversidadController::class, 'updateUniversidad'])->name('updateUniversidad');
Route::delete('/universidades/{idUniversidad}/disable', [UniversidadController::class, 'disableUniversidad'])->name('disableUniversidad');
Route::post('/universidades/{idUniversidad}/enable', [UniversidadController::class, 'enableUniversidad'])->name('enableUniversidad');
Route::delete('/universidades/{idUniversidad}/delete', [UniversidadController::class, 'deleteUniversidad'])->name('deleteUniversidad');

// Carreras
Route::get('/carreras', [CarreraController::class, 'getCarreras'])->name('getCarreras');
Route::get('/carreras/{idCarrera}', [CarreraController::class, 'getCarrera'])->name('getCarrera');
Route::get('/carreras-trashed', [CarreraController::class, 'getTrashedCarreras'])->name('getTrashedCarreras');
Route::get('/carreras/{idCarrera}/trashed', [CarreraController::class, 'getTrashedCarrera'])->name('getTrashedCarrera');
Route::post('/carreras', [CarreraController::class, 'createCarrera'])->name('createCarrera');
Route::put('/carreras/{idCarrera}', [CarreraController::class, 'updateCarrera'])->name('updateCarrera');
Route::delete('/carreras/{idCarrera}/disable', [CarreraController::class, 'disableCarrera'])->name('disableCarrera');
Route::post('/carreras/{idCarrera}/enable', [CarreraController::class, 'enableCarrera'])->name('enableCarrera');
Route::delete('/carreras/{idCarrera}/delete', [CarreraController::class, 'deleteCarrera'])->name('deleteCarrera');

// Estudiantes
Route::get('/estudiantes', [EstudianteController::class, 'getEstudiantes'])->name('getEstudiantes');
Route::get('/estudiantes/{idEstudiante}', [EstudianteController::class, 'getEstudiante'])->name('getEstudiante');
Route::get('/estudiantes-trashed', [EstudianteController::class, 'getTrashedEstudiantes'])->name('getTrashedEstudiantes');
Route::get('/estudiantes/{idEstudiante}/trashed', [EstudianteController::class, 'getTrashedEstudiante'])->name('getTrashedEstudiante');
Route::post('/estudiantes', [EstudianteController::class, 'createEstudiante'])->name('createEstudiante');
Route::put('/estudiantes/{idEstudiante}', [EstudianteController::class, 'updateEstudiante'])->name('updateEstudiante');
Route::delete('/estudiantes/{idEstudiante}/disable', [EstudianteController::class, 'disableEstudiante'])->name('disableEstudiante');
Route::post('/estudiantes/{idEstudiante}/enable', [EstudianteController::class, 'enableEstudiante'])->name('enableEstudiante');
Route::delete('/estudiantes/{idEstudiante}/delete', [EstudianteController::class, 'deleteEstudiante'])->name('deleteEstudiante');