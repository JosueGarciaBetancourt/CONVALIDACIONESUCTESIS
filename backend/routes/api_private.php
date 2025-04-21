<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\MallaController;
use App\Http\Controllers\CarreraController;
use App\Http\Controllers\SilaboController;
use App\Http\Controllers\TestApiController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\UniversidadController;
use App\Http\Controllers\UnidadController;
use App\Http\Controllers\BibliografiaController;

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

// Mallas
Route::get('/mallas', [MallaController::class, 'getMallas'])->name('getMallas');
Route::get('/mallas/{idMalla}', [MallaController::class, 'getMalla'])->name('getMalla');
Route::get('/mallas-trashed', [MallaController::class, 'getTrashedmallas'])->name('getTrashedmallas');
Route::get('/mallas/{idMalla}/trashed', [MallaController::class, 'getTrashedMalla'])->name('getTrashedMalla');
Route::post('/mallas', [MallaController::class, 'createMalla'])->name('createMalla');
Route::put('/mallas/{idMalla}', [MallaController::class, 'updateMalla'])->name('updateMalla');
Route::delete('/mallas/{idMalla}/disable', [MallaController::class, 'disableMalla'])->name('disableMalla');
Route::post('/mallas/{idMalla}/enable', [MallaController::class, 'enableMalla'])->name('enableMalla');
Route::delete('/mallas/{idMalla}/delete', [MallaController::class, 'deleteMalla'])->name('deleteMalla');

// Cursos
Route::get('/cursos', [CursoController::class, 'getCursos'])->name('getCursoss');
Route::get('/cursos/{idCurso}', [CursoController::class, 'getCurso'])->name('getCurso');
Route::get('/cursos-trashed', [CursoController::class, 'getTrashedCursos'])->name('getTrashedCursos');
Route::get('/cursos/{idCurso}/trashed', [CursoController::class, 'getTrashedCurso'])->name('getTrashedCurso');
Route::post('/cursos', [CursoController::class, 'createCurso'])->name('createCurso');
Route::put('/cursos/{idCurso}', [CursoController::class, 'updateCurso'])->name('updateCurso');
Route::delete('/cursos/{idCurso}/disable', [CursoController::class, 'disableCurso'])->name('disableCurso');
Route::post('/cursos/{idCurso}/enable', [CursoController::class, 'enableCurso'])->name('enableCurso');
Route::delete('/cursos/{idCurso}/delete', [CursoController::class, 'deleteCurso'])->name('deleteCurso');

// Silabos
Route::get('/silabos', [SilaboController::class, 'getSilabos'])->name('getSilaboss');
Route::get('/silabos/{idSilabo}', [SilaboController::class, 'getSilabo'])->name('getSilabo');
Route::get('/silabos-trashed', [SilaboController::class, 'getTrashedSilabos'])->name('getTrashedSilabos');
Route::get('/silabos/{idSilabo}/trashed', [SilaboController::class, 'getTrashedSilabo'])->name('getTrashedSilabo');
Route::post('/silabos', [SilaboController::class, 'createSilabo'])->name('createSilabo');
Route::put('/silabos/{idSilabo}', [SilaboController::class, 'updateSilabo'])->name('updateSilabo');
Route::delete('/silabos/{idSilabo}/disable', [SilaboController::class, 'disableSilabo'])->name('disableSilabo');
Route::post('/silabos/{idSilabo}/enable', [SilaboController::class, 'enableSilabo'])->name('enableSilabo');
Route::delete('/silabos/{idSilabo}/delete', [SilaboController::class, 'deleteSilabo'])->name('deleteSilabo');

// Unidades
Route::get('/unidades', [UnidadController::class, 'getUnidades'])->name('getUnidades');
Route::get('/unidades/{idUnidad}', [UnidadController::class, 'getUnidad'])->name('getUnidad');
Route::get('/unidades-trashed', [UnidadController::class, 'getTrashedUnidades'])->name('getTrashedUnidades');
Route::get('/unidades/{idUnidad}/trashed', [UnidadController::class, 'getTrashedUnidad'])->name('getTrashedUnidad');
Route::post('/unidades', [UnidadController::class, 'createUnidad'])->name('createUnidad');
Route::put('/unidades/{idUnidad}', [UnidadController::class, 'updateUnidad'])->name('updateUnidad');
Route::delete('/unidades/{idUnidad}/disable', [UnidadController::class, 'disableUnidad'])->name('disableUnidad');
Route::post('/unidades/{idUnidad}/enable', [UnidadController::class, 'enableUnidad'])->name('enableUnidad');
Route::delete('/unidades/{idUnidad}/delete', [UnidadController::class, 'deleteUnidad'])->name('deleteUnidad');

// Bibliografías
Route::get('/bibliografias', [BibliografiaController::class, 'getBibliografias'])->name('getBibliografias');
Route::get('/bibliografias/{idBibliografia}', [BibliografiaController::class, 'getBibliografia'])->name('getBibliografia');
Route::get('/bibliografias-trashed', [BibliografiaController::class, 'getTrashedBibliografiaes'])->name('getTrashedBibliografias');
Route::get('/bibliografias/{idBibliografia}/trashed', [BibliografiaController::class, 'getTrashedBibliografia'])->name('getTrashedBibliografia');
Route::post('/bibliografias', [BibliografiaController::class, 'createBibliografia'])->name('createBibliografia');
Route::put('/bibliografias/{idBibliografia}', [BibliografiaController::class, 'updateBibliografia'])->name('updateBibliografia');
Route::delete('/bibliografias/{idBibliografia}/disable', [BibliografiaController::class, 'disableBibliografia'])->name('disableBibliografia');
Route::post('/bibliografias/{idBibliografia}/enable', [BibliografiaController::class, 'enableBibliografia'])->name('enableBibliografia');
Route::delete('/bibliografias/{idBibliografia}/delete', [BibliografiaController::class, 'deleteBibliografia'])->name('deleteBibliografia');