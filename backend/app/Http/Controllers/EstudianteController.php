<?php

namespace App\Http\Controllers;

use App\Models\Carrera;
use App\Models\Estudiante;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\estudiante\CreateEstudianteRequest;
use App\Http\Requests\estudiante\UpdateEstudianteRequest;

class EstudianteController extends Controller
{
    public function getEstudiantes()
    {
        try {
            $estudiantes = Estudiante::all();

            return response()->json($estudiantes, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener estudiantes. " . $e->getMessage()
            ], 500);
        }
    }

    public function getEstudiante($idEstudiante)
    {
        try {
            $estudiante = Estudiante::findOrFail($idEstudiante);
            return response()->json($estudiante, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el estudiante con ID $idEstudiante. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedEstudiantes() {
        try {
            $estudiantes = Estudiante::onlyTrashed()->get();

            return response()->json($estudiantes, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener los estudiantes deshabilitados. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedEstudiante($idEstudiante)
    {
        try {
            $estudiante = Estudiante::onlyTrashed()->findOrFail($idEstudiante);
            return response()->json($estudiante, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el estudiante deshabilitado con ID $idEstudiante. " . $e->getMessage()
            ], 500);
        }
    }

    public function createEstudiante(CreateEstudianteRequest $request)
    {
        try {
            // Validación automática por CreateEstudianteRequest
            $data = $request->validated();

            Estudiante::create([
                'DNI' => $data['DNI'],
                'nombre' => $data['nombre'],
                'apellido' => $data['apellido'],
                'email' => $data['email'],
                'celular' => $data['celular'],
                'idCarreraOrigen' => $data['idCarreraOrigen'],
                'idUniversidadOrigen' => $data['idUniversidadOrigen'],
            ]);

            return response()->json([
                'message' => 'Estudiante creado correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear el estudiante. " . $e->getMessage()
            ], 500);
        }
    }

    public function updateEstudiante(UpdateEstudianteRequest $request, $idEstudiante)
    {
        try {
            $data = $request->validated();

            $estudiante = Estudiante::findOrFail($idEstudiante);

            // Actualizar solo los campos presentes
            if (isset($data['nombre'])) $estudiante->nombre = $data['nombre'];
            if (isset($data['apellido'])) $estudiante->apellido = $data['apellido'];
            if (isset($data['email'])) $estudiante->email = $data['email'];
            if (isset($data['celular'])) $estudiante->celular = $data['celular'];

            $estudiante->save();

            return response()->json([
                'message' => 'Estudiante actualizado correctamente'
            ], 200);  
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar el estudiante con ID $idEstudiante. " . $e->getMessage()
            ], 500);
        }
    }

    public function disableEstudiante($idEstudiante)
    {
        try {
            $estudiante = Estudiante::findOrFail($idEstudiante); // Solo estudiantes activos (no eliminadas lógicamente)
            
            $hasSolicitudes = $estudiante->solicitudes()->exists();

            if ($hasSolicitudes) {
                return response()->json([
                    'message' => "No se puede deshabilitar al Estudiante con ID $idEstudiante porque tiene solicitudes de convalidación registradas y/o procesadas."
                ], 403);
            }

            $estudiante->delete(); // Soft delete
    
            return response()->json([
                'message' => 'Estudiante deshabilitado correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al deshabilitar el estudiante con ID $idEstudiante. " . $e->getMessage()
            ], 500);
        }
    }

    public function enableEstudiante($idEstudiante)
    {
        try {
            $estudiante = Estudiante::onlyTrashed()->findOrFail($idEstudiante); // Buscar estudiantes eliminados lógicamente
          
            $estudiante->restore();
          
            return response()->json([
                'message' => 'Estudiante habilitado correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al habilitar el estudiante con ID  $idEstudiante. " . $e->getMessage()
            ], 500); 
        }
    }
    
    public function deleteEstudiante($idEstudiante)
    {
        try {
            $estudiante = Estudiante::withTrashed()->findOrFail($idEstudiante); // Buscar incluso si está eliminado lógicamente
            
            $hasSolicitudes = $estudiante->solicitudes()->exists();

            if ($hasSolicitudes) {
                return response()->json([
                    'message' => "No se puede eliminar al Estudiante con ID $idEstudiante porque tiene solicitudes de convalidación registradas y/o procesadas."
                ], 403);
            }

            $estudiante->forceDelete();
    
            return response()->json([
                'message' => 'Estudiante eliminado correctamente'
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al eliminar el estudiante con ID $idEstudiante. " . $e->getMessage()
            ], 500);
        }
    }
}
