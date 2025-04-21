<?php

namespace App\Http\Controllers;

use App\Models\Unidad;
use App\Models\Malla;
use App\Models\Carrera;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\unidad\CreateUnidadRequest;
use App\Http\Requests\unidad\UpdateUnidadRequest;

class UnidadController extends Controller
{   
    public function getUnidades()
    {
        try {
            $unidades = Unidad::all();

            return response()->json($unidades, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener unidades. " . $e->getMessage()
            ], 500);
        }
    }

    public function getUnidad($idUnidad)
    {
        try {
            $unidad = Unidad::findOrFail($idUnidad);
            return response()->json($unidad, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el unidad con ID $idUnidad. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedUnidades() {
        try {
            $Unidads = Unidad::onlyTrashed()->get();
            return response()->json($Unidads, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener los Unidads deshabilitados. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedUnidad($idUnidad)
    {
        try {
            $Unidad = Unidad::onlyTrashed()->findOrFail($idUnidad);
            return response()->json($Unidad, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el Unidad deshabilitado con ID $idUnidad. " . $e->getMessage()
            ], 500);
        }
    }

    public function createUnidad(CreateUnidadRequest $request)
    {
        try {
            $data = $request->validated();

            Unidad::create($data);

            return response()->json([
                'message' => 'Unidad creada correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear la unidad. " . $e->getMessage()
            ], 500);
        }
    }

    public function updateUnidad(UpdateUnidadRequest $request, $idUnidad)
    {
        try {
            $data = $request->validated();

            if (empty($data)) {
                return response()->json([
                    'message' => 'No se enviaron datos para actualizar.'
                ], 400);
            }

            $unidad = Unidad::findOrFail($idUnidad);
            $curso = $unidad->silabo->curso;

            $hasComparacionesComoOrigen = $curso->comparacionesComoOrigen()->exists();
            $hasComparacionesComoDestino = $curso->comparacionesComoDestino()->exists();

            if ($hasComparacionesComoOrigen || $hasComparacionesComoDestino) {

                $motivos = [];
    
                if ($hasComparacionesComoOrigen) {
                    $motivos[] = 'comparaciones como curso de origen';
                }
    
                if ($hasComparacionesComoDestino) {
                    $motivos[] = 'comparaciones como curso de destino';
                }
    
                // Construcción natural del mensaje (coma entre elementos y "y" antes del último)
                $motivoTexto = implode(', ', array_slice($motivos, 0, -1));
                
                if (count($motivos) > 1) {
                    $motivoTexto .= ' y ' . end($motivos);
                } else {
                    $motivoTexto = $motivos[0];
                }
    
                return response()->json([
                    'message' => "No se puede actualizar la unidad porque es usada para $motivoTexto."
                ], 403);
            }

            $unidad->update($data);

            return response()->json([
                'message' => 'Unidad actualizada correctamente'
            ], 200);  
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar el unidad con ID $idUnidad. " . $e->getMessage()
            ], 500);
        }
    }

    public function disableUnidad($idUnidad)
    {
        try {
            $unidad = Unidad::findOrFail($idUnidad); // Solo unidades activas (no eliminadas lógicamente)
            $curso = $unidad->silabo->curso;

            $hasComparacionesComoOrigen = $curso->comparacionesComoOrigen()->exists();
            $hasComparacionesComoDestino = $curso->comparacionesComoDestino()->exists();

            if ($hasComparacionesComoOrigen || $hasComparacionesComoDestino) {

                $motivos = [];
    
                if ($hasComparacionesComoOrigen) {
                    $motivos[] = 'comparaciones como curso de origen';
                }
    
                if ($hasComparacionesComoDestino) {
                    $motivos[] = 'comparaciones como curso de destino';
                }
    
                // Construcción natural del mensaje (coma entre elementos y "y" antes del último)
                $motivoTexto = implode(', ', array_slice($motivos, 0, -1));
                
                if (count($motivos) > 1) {
                    $motivoTexto .= ' y ' . end($motivos);
                } else {
                    $motivoTexto = $motivos[0];
                }
    
                return response()->json([
                    'message' => "No se puede deshabilitar la unidad porque es usada para $motivoTexto."
                ], 403);
            }

            $unidad->delete(); // Soft delete
    
            return response()->json([
                'message' => 'Unidad deshabilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al deshabilitar la unidad con ID $idUnidad. " . $e->getMessage()
            ], 500);
        }
    }

    public function enableUnidad($idUnidad)
    {
        try {
            $unidad = Unidad::onlyTrashed()->findOrFail($idUnidad); // Buscar unidades eliminadas lógicamente
          
            $unidad->restore();
          
            return response()->json([
                'message' => 'Unidad habilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al habilitar la unidad con ID  $idUnidad. " . $e->getMessage()
            ], 500); 
        }
    }
    
    public function deleteUnidad($idUnidad)
    {
        try {
            $unidad = Unidad::withTrashed()->findOrFail($idUnidad); // Buscar incluso si está eliminado lógicamente
            $curso = $unidad->silabo->curso;

            $hasComparacionesComoOrigen = $curso->comparacionesComoOrigen()->exists();
            $hasComparacionesComoDestino = $curso->comparacionesComoDestino()->exists();

            if ($hasComparacionesComoOrigen || $hasComparacionesComoDestino) {

                $motivos = [];
    
                if ($hasComparacionesComoOrigen) {
                    $motivos[] = 'comparaciones como curso de origen';
                }
    
                if ($hasComparacionesComoDestino) {
                    $motivos[] = 'comparaciones como curso de destino';
                }
    
                // Construcción natural del mensaje (coma entre elementos y "y" antes del último)
                $motivoTexto = implode(', ', array_slice($motivos, 0, -1));
                
                if (count($motivos) > 1) {
                    $motivoTexto .= ' y ' . end($motivos);
                } else {
                    $motivoTexto = $motivos[0];
                }
    
                return response()->json([
                    'message' => "No se puede deshabilitar la unidad porque es usada para $motivoTexto."
                ], 403);
            }

            $unidad->forceDelete();
    
            return response()->json([
                'message' => 'Unidad eliminada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al eliminar la unidad con ID $idUnidad. " . $e->getMessage()
            ], 500);
        }
    }
}
