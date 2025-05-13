<?php

namespace App\Http\Controllers;

use App\Models\GrupoTematico;
use App\Models\Solicitud;
use App\Models\Estudiante;
use App\Models\Universidad;
use App\Http\Requests\grupoTematico\CreateGrupoTematicoRequest;
use App\Http\Requests\grupoTematico\UpdateGrupoTematicoRequest;

class GrupoTematicoController extends Controller
{
    public function getGruposTematicos()
    {
        try {
            $gruposTematicos = GrupoTematico::all();
            return response()->json($gruposTematicos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener Grupos Temáticos. " . $e->getMessage()
            ], 500);
        }
    }

    public function getGrupoTematico($idGrupoTematico)
    {
        try {
            $grupoTematico = GrupoTematico::findOrFail($idGrupoTematico);
            return response()->json($grupoTematico, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el Grupo Temático con ID $idGrupoTematico. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedGruposTematicos() {
        try {
            $gruposTematicos = GrupoTematico::onlyTrashed()->get();
            return response()->json($gruposTematicos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener los Grupos Temáticos deshabilitados. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedGrupoTematico($idGrupoTematico)
    {
        try {
            $grupoTematico = GrupoTematico::onlyTrashed()->findOrFail($idGrupoTematico);
            return response()->json($grupoTematico, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el Grupo Temático deshabilitado con ID $idGrupoTematico. " . $e->getMessage()
            ], 500);
        }
    }

    public function createGrupoTematico(CreateGrupoTematicoRequest $request)
    {
        try {
            $data = $request->validated();

            GrupoTematico::create($data);

            return response()->json([
                'message' => 'Grupo Temático creado correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear el Grupo Temático. " . $e->getMessage()
            ], 500);
        }
    }

    public function updateGrupoTematico(UpdateGrupoTematicoRequest $request, $idGrupoTematico)
    {
        try {
            $data = $request->validated();
            $GrupoTematico = GrupoTematico::findOrFail($idGrupoTematico);

            // Actualizar campos
            if (isset($data['nombre'])) $GrupoTematico->nombre = $data['nombre'];
            if (isset($data['abreviatura'])) $GrupoTematico->abreviatura = $data['abreviatura'];
            if (isset($data['idUniversidad'])) $GrupoTematico->idUniversidad = $data['idUniversidad'];

            // Si no se proporciona código, lo generamos automáticamente
            if (empty($data['codigo'])) {
                $idUni = $data['idUniversidad'] ?? $GrupoTematico->idUniversidad;
                $abreviaturaUniversidad = Universidad::where('idUniversidad', $idUni)->value('abreviatura');
                $data['codigo'] = $abreviaturaUniversidad . '-' . $data['abreviatura'];
            }

            // Verificamos que no exista otro registro con ese mismo código
            if (GrupoTematico::where('codigo', $data['codigo'])->where('idGrupoTematico', '!=', $idGrupoTematico)->exists()) {
                return response()->json([
                    'message' => "Ya existe una GrupoTematico con el código {$data['codigo']}. Intenta usar una abreviatura distinta.",
                ], 422);
            }

            $GrupoTematico->codigo = $data['codigo'];
            $GrupoTematico->save();

            return response()->json([
                'message' => 'GrupoTematico actualizada correctamente'
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar la GrupoTematico con ID $idGrupoTematico. " . $e->getMessage()
            ], 500);
        }
    }

    public function disableGrupoTematico($idGrupoTematico)
    {
        try {
            $GrupoTematico = GrupoTematico::findOrFail($idGrupoTematico); // Solo GruposTematicos activas (no eliminadas lógicamente)
            
            $hasEstudiantes = Estudiante::where('idGrupoTematicoOrigen', $GrupoTematico->idGrupoTematico)->exists();
            $hasMallas = $GrupoTematico->mallas()->exists();
            $hasSolicitudes = Solicitud::where('idGrupoTematicoDestino', $GrupoTematico->idGrupoTematico)->exists();
    
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
                    'message' => "No se puede deshabilitar la GrupoTematico porque tiene $motivoTexto."
                ], 403);
            }
    
            $GrupoTematico->delete(); // Soft delete
    
            return response()->json([
                'message' => 'GrupoTematico deshabilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al deshabilitar la GrupoTematico con ID $idGrupoTematico. " . $e->getMessage()
            ], 500);
        }
    }

    public function enableGrupoTematico($idGrupoTematico)
    {
        try {
            $GrupoTematico = GrupoTematico::onlyTrashed()->findOrFail($idGrupoTematico); // Buscar GrupoTematicoes eliminadas lógicamente
          
            $GrupoTematico->restore();
          
            return response()->json([
                'message' => 'GrupoTematico habilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al habilitar la GrupoTematico con ID  $idGrupoTematico. " . $e->getMessage()
            ], 500);  // Código de estado 500 para "Error interno del servidor"
        }
    }

    public function deleteGrupoTematico($idGrupoTematico)
    {
        try {
            $GrupoTematico = GrupoTematico::withTrashed()->findOrFail($idGrupoTematico); // Buscar incluso si está eliminado lógicamente
            
            $hasEstudiantes = Estudiante::where('idGrupoTematicoOrigen', $GrupoTematico->idGrupoTematico)->exists();
            $hasMallas = $GrupoTematico->mallas()->exists();
            $hasSolicitudes = Solicitud::where('idGrupoTematicoDestino', $GrupoTematico->idGrupoTematico)->exists();
    
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
                    'message' => "No se puede eliminar la GrupoTematico porque tiene $motivoTexto."
                ], 403);
            }
    
            $GrupoTematico->forceDelete();
    
            return response()->json([
                'message' => 'GrupoTematico eliminada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al eliminar la GrupoTematico con ID $idGrupoTematico. " . $e->getMessage()
            ], 500);
        }
    }
}
