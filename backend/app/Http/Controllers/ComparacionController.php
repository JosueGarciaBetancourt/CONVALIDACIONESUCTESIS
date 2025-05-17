<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Comparacion;
use App\Models\DetalleComparacion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\comparacion\CreateComparacionRequest;
use App\Http\Requests\comparacion\UpdateComparacionRequest;
use App\Http\Requests\comparacion\UpdateComparacionBulkRequest;

class ComparacionController extends Controller
{
    public function getComparaciones()
    {
        try {
            $comparaciones = Comparacion::all();
            return response()->json($comparaciones, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener comparaciones. " . $e->getMessage()
            ], 500);
        }
    }

    public function getComparacion($idComparacion)
    {
        try {
            $comparacion = Comparacion::findOrFail($idComparacion);
            return response()->json($comparacion, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la comparación con ID $idComparacion. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedComparaciones() {
        try {
            $comparaciones = Comparacion::onlyTrashed()->get();
            return response()->json($comparaciones, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las comparaciones deshabilitadas. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedComparacion($idSilabo)
    {
        try {
            $comparacion = Comparacion::onlyTrashed()->findOrFail($idSilabo);
            return response()->json($comparacion, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la comparación deshabilitada con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }

    public function createComparacion(CreateComparacionRequest $request)
    {
        try {
            $data = $request->validated();

            $comparacionObj = Comparacion::create($data);
                        
            return response()->json([
                'message' => 'Comparación creada correctamente',
                'idComparacion' => $comparacionObj->idComparacion,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear la comparación. " . $e->getMessage()
            ], 500);
        }
    }

    public function updateComparacion(UpdateComparacionRequest $request, $idComparacion)
    {
        try {
            $data = $request->validated();

            if (empty($data)) {
                return response()->json([
                    'message' => 'No se enviaron datos para actualizar.'
                ], 400);
            }

            $comparacion = Comparacion::findOrFail($idComparacion);
            $comparacion->update($data);

            return response()->json([
                'message' => 'Comparación actualizada correctamente'
            ], 200);  
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar la comparacion con ID $idComparacion. " . $e->getMessage()
            ], 500);
        }
    }

    public function updateComparacionBulk(UpdateComparacionBulkRequest $request)
    {
        try {
            Log::info("xd");
            $data = $request->validated();

            if (empty($data['comparaciones'])) {
                return response()->json([
                    'message' => 'No se enviaron datos para actualizar las comparaciones.'
                ], 400);
            }

            foreach ($data['comparaciones'] as $comparacion) {
                $comp = Comparacion::findOrFail($comparacion['idComparacion']);
                $comp->update($comparacion);
            }

            return response()->json([
                'message' => 'Comparaciones actualizadas correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar las comparaciones. " . $e->getMessage()
            ], 500);
        }
    }
}
