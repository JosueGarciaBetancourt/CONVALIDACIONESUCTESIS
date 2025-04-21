<?php

namespace App\Http\Controllers;

use App\Models\Bibliografia;
use App\Models\Malla;
use App\Models\Carrera;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\bibliografia\CreateBibliografiaRequest;
use App\Http\Requests\bibliografia\UpdateBibliografiaRequest;

class BibliografiaController extends Controller
{   
    public function getBibliografias()
    {
        try {
            $bibliografias = Bibliografia::all();

            return response()->json($bibliografias, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener bibliografias. " . $e->getMessage()
            ], 500);
        }
    }

    public function getBibliografia($idBibliografia)
    {
        try {
            $bibliografia = Bibliografia::findOrFail($idBibliografia);
            return response()->json($bibliografia, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la bibliografia con ID $idBibliografia. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedBibliografias() {
        try {
            $bibliografias = Bibliografia::onlyTrashed()->get();
            return response()->json($bibliografias, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las bibliografias deshabilitadas. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedBibliografia($idBibliografia)
    {
        try {
            $bibliografia = Bibliografia::onlyTrashed()->findOrFail($idBibliografia);
            return response()->json($bibliografia, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la bibliografia deshabilitada con ID $idBibliografia. " . $e->getMessage()
            ], 500);
        }
    }

    public function createBibliografia(CreateBibliografiaRequest $request)
    {
        try {
            $data = $request->validated();

            Bibliografia::create($data);

            return response()->json([
                'message' => 'Bibliografia creada correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear la bibliografia. " . $e->getMessage()
            ], 500);
        }
    }

    public function updateBibliografia(UpdateBibliografiaRequest $request, $idBibliografia)
    {
        try {
            $data = $request->validated();

            if (empty($data)) {
                return response()->json([
                    'message' => 'No se enviaron datos para actualizar.'
                ], 400);
            }

            $bibliografia = Bibliografia::findOrFail($idBibliografia);
            $curso = $bibliografia->silabo->curso;

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
                    'message' => "No se puede actualizar la bibliografia porque es usada para $motivoTexto."
                ], 403);
            }

            $bibliografia->update($data);

            return response()->json([
                'message' => 'Bibliografia actualizada correctamente'
            ], 200);  
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar el bibliografia con ID $idBibliografia. " . $e->getMessage()
            ], 500);
        }
    }

    public function disableBibliografia($idBibliografia)
    {
        try {
            $bibliografia = Bibliografia::findOrFail($idBibliografia); // Solo bibliografias activas (no eliminadas lógicamente)
            $curso = $bibliografia->silabo->curso;

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
                    'message' => "No se puede deshabilitar la bibliografia porque es usada para $motivoTexto."
                ], 403);
            }

            $bibliografia->delete(); // Soft delete
    
            return response()->json([
                'message' => 'Bibliografia deshabilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al deshabilitar la bibliografia con ID $idBibliografia. " . $e->getMessage()
            ], 500);
        }
    }

    public function enableBibliografia($idBibliografia)
    {
        try {
            $bibliografia = Bibliografia::onlyTrashed()->findOrFail($idBibliografia); // Buscar bibliografias eliminadas lógicamente
          
            $bibliografia->restore();
          
            return response()->json([
                'message' => 'Bibliografia habilitada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al habilitar la bibliografia con ID  $idBibliografia. " . $e->getMessage()
            ], 500); 
        }
    }
    
    public function deleteBibliografia($idBibliografia)
    {
        try {
            $bibliografia = Bibliografia::withTrashed()->findOrFail($idBibliografia); // Buscar incluso si está eliminado lógicamente
            $curso = $bibliografia->silabo->curso;

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
                    'message' => "No se puede deshabilitar la bibliografia porque es usada para $motivoTexto."
                ], 403);
            }

            $bibliografia->forceDelete();
    
            return response()->json([
                'message' => 'Bibliografia eliminada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al eliminar la bibliografia con ID $idBibliografia. " . $e->getMessage()
            ], 500);
        }
    }
}
