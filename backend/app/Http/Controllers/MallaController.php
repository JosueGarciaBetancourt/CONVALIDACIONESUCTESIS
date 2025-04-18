<?php

namespace App\Http\Controllers;

use App\Models\Malla;
use App\Models\Solicitud;
use App\Models\Estudiante;
use App\Models\Universidad;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\malla\CreateMallaRequest;
use App\Http\Requests\malla\UpdateMallaRequest;

class MallaController extends Controller
{
    public function getMallas()
    {
        try {
            $mallas = Malla::all();
            return response()->json($mallas, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener mallas. " . $e->getMessage()
            ], 500);
        }
    }

    public function getMalla($idMalla)
    {
        try {
            $malla = Malla::findOrFail($idMalla);
            return response()->json($malla, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la malla con ID $idMalla. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedMallas() {
        try {
            $mallas = Malla::onlyTrashed()->get();
            return response()->json($mallas, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las mallas deshabilitadas. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedMalla($idMalla)
    {
        try {
            $malla = Malla::onlyTrashed()->findOrFail($idMalla);
            return response()->json($malla, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la malla deshabilitada con ID $idMalla. " . $e->getMessage()
            ], 500);
        }
    }

    public function createMalla(CreateMallaRequest $request)
    {
        try {
            $data = $request->validated();

            Malla::create($data);

            return response()->json([
                'message' => 'Malla creada correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear la Malla. " . $e->getMessage()
            ], 500);
        }
    }

    public function updateMalla(UpdateMallaRequest $request, $idMalla)
    {
        try {
            $data = $request->validated();

            if (empty($data)) {
                return response()->json([
                    'message' => 'No se enviaron datos para actualizar.'
                ], 400);
            }

            $malla = Malla::findOrFail($idMalla);
            $malla->update($data);

            return response()->json([
                'message' => 'Malla actualizada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar la malla con ID $idMalla. " . $e->getMessage()
            ], 500);
        }
    }

    public function disableMalla($idMalla)
    {
        try {
            $malla = Malla::findOrFail($idMalla); // Solo mallas activas (no eliminadas lógicamente)
            
            $hasCursos = $malla->cursos()->exists();
    
            if ($hasCursos) {
                return response()->json([
                    'message' => "No se puede deshabilitar la malla porque tiene cursos asociados."
                ], 403);
            }
    
            $malla->delete(); // Soft delete
    
            return response()->json([
                'message' => 'Malla deshabilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al deshabilitar la malla con ID $idMalla. " . $e->getMessage()
            ], 500);
        }
    }

    public function enableMalla($idMalla)
    {
        try {
            $malla = Malla::onlyTrashed()->findOrFail($idMalla); // Buscar mallas eliminadas lógicamente
          
            $malla->restore();
          
            return response()->json([
                'message' => 'Malla habilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al habilitar la malla con ID  $idMalla. " . $e->getMessage()
            ], 500);
        }
    }

    public function deleteMalla($idMalla)
    {
        try {
            $malla = Malla::withTrashed()->findOrFail($idMalla); // Buscar incluso si está eliminado lógicamente
            
            $hasCursos = $malla->cursos()->exists();
    
            if ($hasCursos) {
                return response()->json([
                    'message' => "No se puede eliminar la malla porque tiene cursos asociados."
                ], 403);
            }
    
            $malla->forceDelete(); 
    
            return response()->json([
                'message' => 'Malla eliminada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al eliminar la malla con ID $idMalla. " . $e->getMessage()
            ], 500);
        }
    }
}
