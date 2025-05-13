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
            
            if (empty($data)) {
                return response()->json([
                    'message' => 'No se enviaron datos para actualizar.'
                ], 400);
            }

            $grupoTematico = GrupoTematico::findOrFail($idGrupoTematico);
            $hasCursos = $grupoTematico->cursosGruposTematicos()->exists();

            if ($hasCursos) {
                return response()->json([
                    'message' => "No se puede actualizar el Grupo Temático porque tiene cursos asociados"
                ], 403);
            }

            $grupoTematico->update($data);

            return response()->json([
                'message' => 'Grupo Temático actualizado correctamente'
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar el Grupo Temático con ID $idGrupoTematico. " . $e->getMessage()
            ], 500);
        }
    }

    public function disableGrupoTematico($idGrupoTematico)
    {
        try {
            $grupoTematico = GrupoTematico::findOrFail($idGrupoTematico);
            
            $grupoTematico->delete(); // Soft delete
    
            return response()->json([
                'message' => 'Grupo Temático deshabilitado correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al deshabilitar el Grupo Temático con ID $idGrupoTematico. " . $e->getMessage()
            ], 500);
        }
    }

    public function enableGrupoTematico($idGrupoTematico)
    {
        try {
            $grupoTematico = GrupoTematico::onlyTrashed()->findOrFail($idGrupoTematico); 
          
            $grupoTematico->restore();
          
            return response()->json([
                'message' => 'Grupo Temático habilitado correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al habilitar el Grupo Temático con ID  $idGrupoTematico. " . $e->getMessage()
            ], 500); 
        }
    }

    public function deleteGrupoTematico($idGrupoTematico)
    {
        try {
            $grupoTematico = GrupoTematico::withTrashed()->findOrFail($idGrupoTematico); 
            
            $grupoTematico->forceDelete();
    
            return response()->json([
                'message' => 'Grupo Temático eliminado correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al eliminar el Grupo Temático con ID $idGrupoTematico. " . $e->getMessage()
            ], 500);
        }
    }
}
