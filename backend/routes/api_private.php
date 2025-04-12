<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Models\User;

// ==============================
// 🔒 RUTAS PROTEGIDAS (requieren token Sanctum)
// ==============================

// Dashboard protegido
Route::get('/dashboard', [ApiController::class, 'dashboard']);

// Logout
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Users
Route::get('/users', [UserController::class, 'getUsers'])->name('getUsers');

Route::get('/users/{id}', function ($id) {
    return User::findOrFail($id);
});

Route::post('/users', function (Request $request) {
    return User::create($request->all());
});

Route::put('/users/{id}', function (Request $request, $id) {
    $user = User::findOrFail($id);
    $user->update($request->all());
    return $user;
});

Route::delete('/users/{id}', function ($id) {
    User::destroy($id);
    return response()->json(['message' => 'Usuario eliminado']);
});