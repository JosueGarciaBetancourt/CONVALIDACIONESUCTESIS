<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers()
    {
        try {
            $users = User::all();

            return response()->json($users, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener usuarios: ' . $e->getMessage()
            ], 500);  // Código de estado 500 para "Error interno del servidor"
        }
    }
}
