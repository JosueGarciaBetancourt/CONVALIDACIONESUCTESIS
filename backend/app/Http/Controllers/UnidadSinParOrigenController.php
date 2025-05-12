<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Comparacion;
use App\Models\UnidadesSinParOrigen;

class UnidadSinParOrigenController extends Controller
{
    public function getUnidadesSinParOrigen()
    {
        try {
            $unidadesSinParOrigen = UnidadesSinParOrigen::all();
            return response()->json($unidadesSinParOrigen, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener todas las unidades de origen sin par. " . $e->getMessage()
            ], 500);
        }
    }

    public function getUnidadSinParOrigen($idUnidadesSinParOrigen)
    {
        try {
            $unidadesSinParOrigen = UnidadesSinParOrigen::findOrFail($idUnidadesSinParOrigen);
            return response()->json($unidadesSinParOrigen, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la unidad de origen sin par con ID $idUnidadesSinParOrigen. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedUnidadesSinParOrigen() {
        try {
            $unidadesSinParOrigen = UnidadesSinParOrigen::onlyTrashed()->get();
            return response()->json($unidadesSinParOrigen, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener todas las unidades de origen sin par deshabilitadas. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedUnidadSinParOrigen($idSilabo)
    {
        try {
            $UnidadesSinParOrigen = UnidadesSinParOrigen::onlyTrashed()->findOrFail($idSilabo);
            return response()->json($UnidadesSinParOrigen, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la unidad de origen sin par deshabilitada con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }
}
