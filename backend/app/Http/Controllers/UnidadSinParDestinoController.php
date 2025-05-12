<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Comparacion;
use App\Models\UnidadesSinParDestino;

class UnidadSinParDestinoController extends Controller
{
    public function getUnidadesSinParDestino()
    {
        try {
            $unidadesSinParDestino = UnidadesSinParDestino::all();
            return response()->json($unidadesSinParDestino, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener todas las unidades de destino sin par. " . $e->getMessage()
            ], 500);
        }
    }

    public function getUnidadSinParDestino($idUnidadesSinParDestino)
    {
        try {
            $unidadSinParDestino = UnidadesSinParDestino::findOrFail($idUnidadesSinParDestino);
            return response()->json($unidadSinParDestino, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la unidad de destino sin par con ID $idUnidadesSinParDestino. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedUnidadesSinParDestino() {
        try {
            $unidadesSinParDestino = UnidadesSinParDestino::onlyTrashed()->get();
            return response()->json($unidadesSinParDestino, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener todas las unidades de destino sin par deshabilitadas. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedUnidadSinParDestino($idSilabo)
    {
        try {
            $unidadSinParDestino = UnidadesSinParDestino::onlyTrashed()->findOrFail($idSilabo);
            return response()->json($unidadSinParDestino, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la unidad de destino sin par deshabilitada con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }
}
