<?php

namespace App\Http\Controllers;

use App\Models\CursoGrupoTematico;
use App\Http\Requests\cursoGrupoTematico\CreateCursoGrupoTematicoRequest;

class CursoGrupoTematicoController extends Controller
{   
    public function getCursosGruposTematicos()
    {
        try {
            $cursosGruposTematicos = CursoGrupoTematico::all();

            return response()->json($cursosGruposTematicos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener Cursos con Grupos Temáticos. " . $e->getMessage()
            ], 500);
        }
    }

    public function getCursoGrupoTematico($idCursoGrupoTematico)
    {
        try {
            $cursoGrupoTematico = CursoGrupoTematico::findOrFail($idCursoGrupoTematico);
            return response()->json($cursoGrupoTematico, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el Curso con Grupo Temático con ID $idCursoGrupoTematico. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedCursosGruposTematicos() {
        try {
            $cursosGruposTematicos = CursoGrupoTematico::onlyTrashed()->get();
            return response()->json($cursosGruposTematicos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener los Cursos con Grupos Temáticos deshabilitados. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedCursoGrupoTematico($idCursoGrupoTematico)
    {
        try {
            $cursoGrupoTematico = CursoGrupoTematico::onlyTrashed()->findOrFail($idCursoGrupoTematico);
            return response()->json($cursoGrupoTematico, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el Curso con Grupo Temático deshabilitado con ID $idCursoGrupoTematico. " . $e->getMessage()
            ], 500);
        }
    }

    public function createCursoGrupoTematico(CreateCursoGrupoTematicoRequest $request)
    {
        try {
            $data = $request->validated();

            CursoGrupoTematico::create($data);

            return response()->json([
                'message' => 'Curso con Grupo Temático creado correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear el Curso con Grupo Temático. " . $e->getMessage()
            ], 500);
        }
    }

    // Solo se pueden crear registros para la tabla CursosGruposTematicos
    // Las deshabilitaciones, habilitaciones y eliminaciones se hacen en los modelos Curso y GrupoTematico
}
