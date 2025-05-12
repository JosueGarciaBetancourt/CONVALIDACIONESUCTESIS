<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Comparacion;
use App\Models\UnidadesComparadas;

class UnidadesComparadasController extends Controller
{
    public function getAllUnidadesComparadas()
    {
        try {
            $allUnidadesComparadas = UnidadesComparadas::all();
            return response()->json($allUnidadesComparadas, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener todas las unidades comparadas. " . $e->getMessage()
            ], 500);
        }
    }

    public function getUnidadesComparadas($idUnidadesComparadas)
    {
        try {
            $unidadesComparadas = UnidadesComparadas::findOrFail($idUnidadesComparadas);
            return response()->json($unidadesComparadas, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las unidades comparadas con ID $idUnidadesComparadas. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedAllUnidadesComparadas() {
        try {
            $allUnidadesComparadas = UnidadesComparadas::onlyTrashed()->get();
            return response()->json($allUnidadesComparadas, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener todas las unidades comparadas deshabilitadas. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedUnidadesComparadas($idSilabo)
    {
        try {
            $unidadesComparadas = UnidadesComparadas::onlyTrashed()->findOrFail($idSilabo);
            return response()->json($unidadesComparadas, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las unidades comparadas deshabilitadas con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }
}
