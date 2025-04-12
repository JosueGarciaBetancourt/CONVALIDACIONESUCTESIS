<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function testParam($param) {
        return response()->json([
            'mensaje' => 'Hola ' . $param
        ]);
    }

    public function testAll() {
        return response()->json([
            'mensaje' => 'Hola a Todos'
        ]);
    }
}
    
