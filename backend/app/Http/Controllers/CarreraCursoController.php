<?php

namespace App\Http\Controllers;

use App\Models\CarreraCurso;
use App\Models\Malla;
use App\Models\Carrera;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\carreraCurso\CreateCarreraCursoRequest;

class CarreraCursoController extends Controller
{   
    public function getCarrerasCursos()
    {
        try {
            $carrerasCursos = CarreraCurso::all();

            return response()->json($carrerasCursos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las carreras con cursos. " . $e->getMessage()
            ], 500);
        }
    }

    public function getCarreraCurso($idCarreraCurso)
    {
        try {
            $carreraCurso = CarreraCurso::findOrFail($idCarreraCurso);
            return response()->json($carreraCurso, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la carrera con curso con ID $idCarreraCurso. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedCarrerasCursos() {
        try {
            $carrerasCursos = CarreraCurso::onlyTrashed()->get();
            return response()->json($carrerasCursos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las carreras con cursos deshabilitadas. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedCarreraCurso($idCarreraCurso)
    {
        try {
            $carreraCurso = CarreraCurso::onlyTrashed()->findOrFail($idCarreraCurso);
            return response()->json($carreraCurso, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la carrera con curso deshabilitada con ID $idCarreraCurso. " . $e->getMessage()
            ], 500);
        }
    }

    public function createCarreraCurso(CreateCarreraCursoRequest $request)
    {
        try {
            $data = $request->validated();

            CarreraCurso::create($data);

            return response()->json([
                'message' => 'Carrera con curso creada correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear la carrera con curso. " . $e->getMessage()
            ], 500);
        }
    }

    // Solo se pueden crear registros para la tabla CarrerasCursos
    // Las deshabilitaciones, habilitaciones y eliminaciones se hacen en los modelos Carrera y Curso
}
