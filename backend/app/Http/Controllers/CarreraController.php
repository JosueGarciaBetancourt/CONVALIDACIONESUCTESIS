<?php

namespace App\Http\Controllers;

use App\Models\Carrera;
use App\Models\Solicitud;
use App\Models\Estudiante;
use App\Models\Universidad;
use App\Models\CarreraCurso;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\carrera\CreateCarreraRequest;
use App\Http\Requests\carrera\UpdateCarreraRequest;

class CarreraController extends Controller
{
    public function getCarreras()
    {
        try {
            $carreras = Carrera::all();
            return response()->json($carreras, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener carreras. " . $e->getMessage()
            ], 500);
        }
    }

    public function getCarrera($idCarrera)
    {
        try {
            $carrera = Carrera::findOrFail($idCarrera);
            return response()->json($carrera, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la carrera con ID $idCarrera. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedCarreras() {
        try {
            $carreras = Carrera::onlyTrashed()->get();
            return response()->json($carreras, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las carreras deshabilitadas. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedCarrera($idCarrera)
    {
        try {
            $carrera = Carrera::onlyTrashed()->findOrFail($idCarrera);
            return response()->json($carrera, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la carrera deshabilitada con ID $idCarrera. " . $e->getMessage()
            ], 500);
        }
    }

    public function createCarrera(CreateCarreraRequest $request)
    {
        try {
            $data = $request->validated();

            // Si no se proporciona código, lo generamos automáticamente
            if (empty($data['codigo'])) {
                $abreviaturaUniversidad = Universidad::where('idUniversidad', $data['idUniversidad'])->value('abreviatura');
                $data['codigo'] = $abreviaturaUniversidad . '-' . $data['abreviatura'];
            }

            // Verificamos que el código no se repita (por si se genera automáticamente)
            if (Carrera::where('codigo', $data['codigo'])->exists()) {
                return response()->json([
                    'message' => "Ya existe una carrera con el código {$data['codigo']}. Intenta usar una abreviatura distinta.",
                ], 422);
            }

            Carrera::create($data);

            return response()->json([
                'message' => 'Carrera creada correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear la carrera. " . $e->getMessage()
            ], 500);
        }
    }

    public function updateCarrera(UpdateCarreraRequest $request, $idCarrera)
    {
        try {
            $data = $request->validated();
            $carrera = Carrera::findOrFail($idCarrera);

            // Actualizar campos
            if (isset($data['nombre'])) $carrera->nombre = $data['nombre'];
            if (isset($data['abreviatura'])) $carrera->abreviatura = $data['abreviatura'];
            if (isset($data['idUniversidad'])) $carrera->idUniversidad = $data['idUniversidad'];

            // Si no se proporciona código, lo generamos automáticamente
            if (empty($data['codigo'])) {
                $idUni = $data['idUniversidad'] ?? $carrera->idUniversidad;
                $abreviaturaUniversidad = Universidad::where('idUniversidad', $idUni)->value('abreviatura');
                $data['codigo'] = $abreviaturaUniversidad . '-' . $data['abreviatura'];
            }

            // Verificamos que no exista otro registro con ese mismo código
            if (Carrera::where('codigo', $data['codigo'])->where('idCarrera', '!=', $idCarrera)->exists()) {
                return response()->json([
                    'message' => "Ya existe una carrera con el código {$data['codigo']}. Intenta usar una abreviatura distinta.",
                ], 422);
            }

            $carrera->codigo = $data['codigo'];
            $carrera->save();

            return response()->json([
                'message' => 'Carrera actualizada correctamente'
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar la carrera con ID $idCarrera. " . $e->getMessage()
            ], 500);
        }
    }

    public function disableCarrera($idCarrera)
    {
        try {
            $carrera = Carrera::findOrFail($idCarrera); // Solo carreras activas (no eliminadas lógicamente)
            
            $hasEstudiantes = Estudiante::where('idCarreraOrigen', $carrera->idCarrera)->exists();
            $hasMallas = $carrera->mallas()->exists();
            $hasSolicitudes = Solicitud::where('idCarreraDestino', $carrera->idCarrera)->exists();
    
            if ($hasEstudiantes || $hasMallas || $hasSolicitudes) {
                $motivos = [];
    
                if ($hasEstudiantes) {
                    $motivos[] = 'estudiantes registrados';
                }
    
                if ($hasMallas) {
                    $motivos[] = 'mallas curriculares asociadas';
                }
    
                if ($hasSolicitudes) {
                    $motivos[] = 'solicitudes de convalidación vinculadas';
                }
    
                // Construcción natural del mensaje (coma entre elementos y "y" antes del último)
                $motivoTexto = implode(', ', array_slice($motivos, 0, -1));
                
                if (count($motivos) > 1) {
                    $motivoTexto .= ' y ' . end($motivos);
                } else {
                    $motivoTexto = $motivos[0];
                }
    
                return response()->json([
                    'message' => "No se puede deshabilitar la carrera porque tiene $motivoTexto."
                ], 403);
            }
    
            $carrera->delete(); // Soft delete
    
            return response()->json([
                'message' => 'Carrera deshabilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al deshabilitar la carrera con ID $idCarrera. " . $e->getMessage()
            ], 500);
        }
    }

    public function enableCarrera($idCarrera)
    {
        try {
            $Carrera = Carrera::onlyTrashed()->findOrFail($idCarrera); // Buscar Carreraes eliminadas lógicamente
          
            $Carrera->restore();
          
            return response()->json([
                'message' => 'Carrera habilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al habilitar la Carrera con ID  $idCarrera. " . $e->getMessage()
            ], 500);  // Código de estado 500 para "Error interno del servidor"
        }
    }

    public function deleteCarrera($idCarrera)
    {
        try {
            $carrera = Carrera::withTrashed()->findOrFail($idCarrera); // Buscar incluso si está eliminado lógicamente
            
            $hasEstudiantes = Estudiante::where('idCarreraOrigen', $carrera->idCarrera)->exists();
            $hasMallas = $carrera->mallas()->exists();
            $hasSolicitudes = Solicitud::where('idCarreraDestino', $carrera->idCarrera)->exists();
    
            if ($hasEstudiantes || $hasMallas || $hasSolicitudes) {
                $motivos = [];
    
                if ($hasEstudiantes) {
                    $motivos[] = 'estudiantes registrados';
                }
    
                if ($hasMallas) {
                    $motivos[] = 'mallas curriculares asociadas';
                }
    
                if ($hasSolicitudes) {
                    $motivos[] = 'solicitudes de convalidación vinculadas';
                }
    
                // Construcción natural del mensaje (coma entre elementos y "y" antes del último)
                $motivoTexto = implode(', ', array_slice($motivos, 0, -1));
                
                if (count($motivos) > 1) {
                    $motivoTexto .= ' y ' . end($motivos);
                } else {
                    $motivoTexto = $motivos[0];
                }
    
                return response()->json([
                    'message' => "No se puede eliminar la carrera porque tiene $motivoTexto."
                ], 403);
            }
    
            $carrera->forceDelete();
    
            return response()->json([
                'message' => 'Carrera eliminada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al eliminar la carrera con ID $idCarrera. " . $e->getMessage()
            ], 500);
        }
    }
}
