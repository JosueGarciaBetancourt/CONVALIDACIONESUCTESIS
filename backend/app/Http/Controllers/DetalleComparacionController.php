<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Comparacion;
use App\Models\DetalleComparacion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\detalleComparacion\CreateDetalleComparacionRequest;
use App\Http\Requests\detalleComparacion\UpdateDetalleComparacionRequest;

class DetalleComparacionController extends Controller
{
    public function getDetallesComparaciones()
    {
        try {
            $detallesComparaciones = DetalleComparacion::all();
            return response()->json($detallesComparaciones, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener los detalles de comparaciones. " . $e->getMessage()
            ], 500);
        }
    }

    public function getDetalleComparacion($idDetalleComparacion)
    {
        try {
            $detalleComparacion = DetalleComparacion::findOrFail($idDetalleComparacion);
            return response()->json($detalleComparacion, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el detalle de comparación con ID $idDetalleComparacion. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedDetallesComparaciones() {
        try {
            $detallesComparaciones = DetalleComparacion::onlyTrashed()->get();
            return response()->json($detallesComparaciones, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener los detalles de comparaciones deshabilitados. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedDetalleComparacion($idSilabo)
    {
        try {
            $detalleComparacion = DetalleComparacion::onlyTrashed()->findOrFail($idSilabo);
            return response()->json($detalleComparacion, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el detalle de comparación deshabilitado con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }

    public static function getPorcentajeSimilitudPonderadaByDetalleComparacionObject($detalleComparacion) {
        $porcentajeSimilitudPonderada = $detalleComparacion['similitud_sumilla'] * 0.3 +
                                        $detalleComparacion['similitud_aprendizajes'] * 0.25 + 
                                        $detalleComparacion['similitud_unidades'] * 0.3 + 
                                        $detalleComparacion['similitud_bibliografia'] * 0.15;
        return $porcentajeSimilitudPonderada;
    }

    public function createDetalleComparacion(CreateDetalleComparacionRequest $request)
    {
        try {
            $data = $request->validated();

            $detalleComparacion = DetalleComparacion::create($data);
        
            // Actualizar el porcentaje de similitud de la comparación asociada
            $porcentaje_similitud = $this::getPorcentajeSimilitudPonderadaByDetalleComparacionObject($detalleComparacion);
            $resultado = $porcentaje_similitud < 0.75 ? 0 : 1;
            $comparacion = Comparacion::findOrFail($detalleComparacion['idComparacion']);
            $comparacion->update([
                'porcentaje_similitud' => $porcentaje_similitud,
                'resultado' => $resultado,
            ]);

            return response()->json([
                'message' => 'Detalle de comparación creada y comparación asociada actualizada correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear el detalle de comparación. " . $e->getMessage()
            ], 500);
        }
    }
    
    public function updateDetalleComparacion(UpdateDetalleComparacionRequest $request, $idDetalleComparacion)
    {
        try {
            $data = $request->validated();

            if (empty($data)) {
                return response()->json([
                    'message' => 'No se enviaron datos para actualizar.'
                ], 400);
            }

            $detalleComparacion = DetalleComparacion::findOrFail($idDetalleComparacion);
            $detalleComparacion->update($data);

            // Actualizar el porcentaje de similitud de la comparación asociada
            $porcentaje_similitud = $this::getPorcentajeSimilitudPonderadaByDetalleComparacionObject($detalleComparacion);
            $resultado = $porcentaje_similitud < 0.75 ? 0 : 1;
            $comparacion = Comparacion::findOrFail($detalleComparacion['idComparacion']);
            $comparacion->update([
                'porcentaje_similitud' => $porcentaje_similitud,
                'resultado' => $resultado,
            ]);

            return response()->json([
                'message' => 'Detalle de comparación actualizado y comparación asociada actualizada correctamente'
            ], 200);  
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar el  detalle de comparación con ID $idDetalleComparacion. " . $e->getMessage()
            ], 500);
        }
    }
}
