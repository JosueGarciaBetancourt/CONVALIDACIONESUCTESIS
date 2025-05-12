<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Comparacion;
use App\Models\TemasComunes;

class TemaComunController extends Controller
{
    public function getTemasComunes()
    {
        try {
            $temasComunes = TemasComunes::all();
            return response()->json($temasComunes, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener todos los temas comunes. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTemaComun($idTemasComunes)
    {
        try {
            $temaComun = TemasComunes::findOrFail($idTemasComunes);
            return response()->json($temaComun, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el tema común con ID $idTemasComunes. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedTemasComunes() {
        try {
            $temasComunes = TemasComunes::onlyTrashed()->get();
            return response()->json($temasComunes, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener todos los temas comunes  deshabilitados. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedTemaComun($idSilabo)
    {
        try {
            $temaComun = TemasComunes::onlyTrashed()->findOrFail($idSilabo);
            return response()->json($temaComun, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el tema común deshabilitado con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }
}
