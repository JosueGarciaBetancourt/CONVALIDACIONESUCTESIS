<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Models\Universidad;
use App\Http\Requests\universidad\CreateUniversidadRequest;
use App\Http\Requests\universidad\UpdateUniversidadRequest;

class UniversidadController extends Controller
{
    public function getUniversidades()
    {
        try {
            $universidades = Universidad::all();

            return response()->json($universidades, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener universidades. " . $e->getMessage()
            ], 500);
        }
    }

    public function getUniversidad($idUniversidad)
    {
        try {
            $universidad = Universidad::findOrFail($idUniversidad);
            return response()->json($universidad, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la universidad con ID $idUniversidad. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedUniversidades() {
        try {
            $universidades = Universidad::onlyTrashed()->get();

            return response()->json($universidades, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las universidades deshabilitadas. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedUniversidad($idUniversidad)
    {
        try {
            $universidad = Universidad::onlyTrashed()->findOrFail($idUniversidad);
            return response()->json($universidad, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la universidad deshabilitada con ID $idUniversidad. " . $e->getMessage()
            ], 500);
        }
    }

    public function createUniversidad(CreateUniversidadRequest $request)
    {
        try {
            // Validación automática por CreateUniversidadRequest
            $data = $request->validated();

            Universidad::create([
                'nombre' => $data['nombre'],
                'abreviatura' => $data['abreviatura'],
                'region' => $data['region'],
                'ciudad' => $data['ciudad'],
            ]);

            return response()->json([
                'message' => 'Universidad creada correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear la universidad. " . $e->getMessage()
            ], 500);
        }
    }

    public function updateUniversidad(UpdateUniversidadRequest $request, $idUniversidad)
    {
        try {
            // Validación automática por UpdateUniversidadRequest
            $data = $request->validated();

            if (empty($data)) {
                return response()->json([
                    'message' => 'No se enviaron datos para actualizar.'
                ], 400);
            }

            // Buscar la universidad por su ID
            $universidad = Universidad::findOrFail($idUniversidad);
            $universidad->update($data);

            return response()->json([
                'message' => 'Universidad actualizada correctamente'
            ], 200);  
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar la universidad con ID $idUniversidad. " . $e->getMessage()
            ], 500);
        }
    }

    public function disableUniversidad($idUniversidad)
    {
        try {
            $universidad = Universidad::findOrFail($idUniversidad); // Solo universidades activas (no eliminadas lógicamente)
            
            $hasCarreras = $universidad->carreras()->exists();
            $hasEstudiantes = Estudiante::where('idUniversidadOrigen', $universidad->idUniversidad)->exists();

            if ($hasCarreras || $hasEstudiantes) {
                $motivos = [];

                if ($hasCarreras) {
                    $motivos[] = 'carreras registradas';
                }

                if ($hasEstudiantes) {
                    $motivos[] = 'estudiantes asociados';
                }

                return response()->json([
                    'message' => "No se puede deshabilitar la universidad con ID $idUniversidad porque tiene " . implode(' y ', $motivos) . "."
                ], 403);
            }

            $universidad->delete(); // Soft delete
    
            return response()->json([
                'message' => 'Universidad deshabilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al deshabilitar la universidad con ID $idUniversidad. " . $e->getMessage()
            ], 500);
        }
    }

    public function enableUniversidad($idUniversidad)
    {
        try {
            $universidad = Universidad::onlyTrashed()->findOrFail($idUniversidad); // Buscar universidades eliminadas lógicamente
          
            $universidad->restore();
          
            return response()->json([
                'message' => 'Universidad habilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al habilitar la universidad con ID  $idUniversidad. " . $e->getMessage()
            ], 500);  // Código de estado 500 para "Error interno del servidor"
        }
    }
    
    public function deleteUniversidad($idUniversidad)
    {
        try {
            $universidad = Universidad::withTrashed()->findOrFail($idUniversidad); // Buscar incluso si está eliminado lógicamente
            
            $hasCarreras = $universidad->carreras()->exists();
            $hasEstudiantes = Estudiante::where('idUniversidadOrigen', $universidad->idUniversidad)->exists();

            if ($hasCarreras || $hasEstudiantes) {
                $motivos = [];

                if ($hasCarreras) {
                    $motivos[] = 'carreras registradas';
                }

                if ($hasEstudiantes) {
                    $motivos[] = 'estudiantes asociados';
                }

                return response()->json([
                    'message' => "No se puede eliminar la universidad con ID $idUniversidad porque tiene " . implode(' y ', $motivos) . "."
                ], 403);
            }
    
            $universidad->forceDelete();
    
            return response()->json([
                'message' => 'Universidad eliminada correctamente'
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al eliminar la universidad con ID $idUniversidad. " . $e->getMessage()
            ], 500);
        }
    }
}
