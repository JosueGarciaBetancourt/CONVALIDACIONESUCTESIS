<?php

namespace App\Http\Controllers;

use App\Models\EstadisticasDetalleComparacion;

class EstadisticasDetalleComparacionController extends Controller
{
    public function getAllEstadisticasDetalleComparacion()
    {
        try {
            $allEstadisticasDetalleComparacion = EstadisticasDetalleComparacion::all();
            return response()->json($allEstadisticasDetalleComparacion, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener todas las estadísticas de todos los detalles de comparaciones. " . $e->getMessage()
            ], 500);
        }
    }

    public function getEstadisticasDetalleComparacion($idEstadisticasDetalleComparacion)
    {
        try {
            $estadisticasDetalleComparacion = EstadisticasDetalleComparacion::findOrFail($idEstadisticasDetalleComparacion);
            return response()->json($estadisticasDetalleComparacion, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las estadísticas de detalle de comparación con ID $idEstadisticasDetalleComparacion. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedAllEstadisticasDetalleComparacion() {
        try {
            $allEstadisticasDetalleComparacion = EstadisticasDetalleComparacion::onlyTrashed()->get();
            return response()->json($allEstadisticasDetalleComparacion, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener todas las estadísticas de todos los detalles de comparaciones deshabilitadas. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedEstadisticasDetalleComparacion($idSilabo)
    {
        try {
            $estadisticasDetalleComparacion = EstadisticasDetalleComparacion::onlyTrashed()->findOrFail($idSilabo);
            return response()->json($estadisticasDetalleComparacion, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las estadísticas de detalle de comparación deshabilitadas con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }
}
