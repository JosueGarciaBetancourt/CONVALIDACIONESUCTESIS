<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Silabo;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\silabo\CreateSilaboRequest;
use App\Http\Requests\silabo\UpdateSilaboRequest;

class SilaboController extends Controller
{
    public function getSilabos()
    {
        try {
            $silabos = Silabo::all();

            return response()->json($silabos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener silabos. " . $e->getMessage()
            ], 500);
        }
    }

    public function getSilabo($idSilabo)
    {
        try {
            $silabo = Silabo::findOrFail($idSilabo);
            return response()->json($silabo, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el silabo con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedSilabos() {
        try {
            $silabos = Silabo::onlyTrashed()->get();
            return response()->json($silabos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener los silabos deshabilitados. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedSilabo($idSilabo)
    {
        try {
            $silabo = Silabo::onlyTrashed()->findOrFail($idSilabo);
            return response()->json($silabo, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el silabo deshabilitado con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }

    public function createSilabo(CreateSilaboRequest $request)
    {
        try {
            $data = $request->validatedWithCalculatedHours();

            $silabo_object = Silabo::create($data);
            
            // Actualizar código del Curso asociado
            $codigoCurso = CursoController::generateCodigoCurso($silabo_object);
            Curso::where('idCurso', $silabo_object->idCurso)->update(['codigo' => $codigoCurso]);
    
            return response()->json([
                'message' => 'Sílabo creado y codigo de curso actualizado correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear el sílabo. " . $e->getMessage()
            ], 500);
        }
    }

    public function updateSilabo(UpdateSilaboRequest $request, $idSilabo)
    {
        try {
            $data = $request->validatedWithCalculatedHours();

            if (empty($data)) {
                return response()->json([
                    'message' => 'No se enviaron datos para actualizar.'
                ], 400);
            }

            $silabo_object = Silabo::findOrFail($idSilabo);
            $curso = $silabo_object->curso;

            $hasComparacionesComoOrigen = $curso->comparacionesComoOrigen()->exists();
            $hasComparacionesComoDestino = $curso->comparacionesComoDestino()->exists();

            //Controller::printJSON($curso->comparacionesComoOrigen()->get());

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
                    'message' => "No se puede actualizar el sílabo porque tiene $motivoTexto."
                ], 403);
            }

            // Si es que se modifica el codigo del sílabo, actualizar el código del curso asociado
            if (isset($data['codigo'])) {
                $silabo_object->codigo = $data['codigo'];
                $codigoCurso = CursoController::generateCodigoCurso($silabo_object);
                Curso::where('idCurso', $silabo_object->idCurso)->update(['codigo' => $codigoCurso]);
            }

            // CASO 1: Si se envió horas_teoricoPracticas, anulamos teoría y práctica
            if (array_key_exists('horas_teoricoPracticas', $data)) {
                $data['horas_teoria'] = null;
                $data['horas_practica'] = null;
            }

            $silabo_object->update($data);

            return response()->json([
                'message' => 'Sílabo y código de curso actualizado correctamente'
            ], 200);  
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar el sílabo con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }

    public function disableSilabo($idSilabo)
    {
        try {
            $silabo = Silabo::findOrFail($idSilabo); // Solo silabos activos (no eliminados lógicamente)
            $curso = $silabo->curso;

            $hasUnidades = $silabo->unidades()->exists();
            $hasBibliografias = $silabo->bibliografias()->exists();
            $hasComparacionesComoOrigen = $curso->comparacionesComoOrigen()->exists();
            $hasComparacionesComoDestino = $curso->comparacionesComoDestino()->exists();
            
            if ($hasUnidades || $hasBibliografias || $hasComparacionesComoOrigen || $hasComparacionesComoDestino) {

                $motivos = [];
    
                if ($hasUnidades) {
                    $motivos[] = 'unidades en su contenido';
                }
    
                if ($hasBibliografias) {
                    $motivos[] = 'bibliografías en su contenido';
                }
    
                if ($hasComparacionesComoOrigen) {
                    $motivos[] = 'comparaciones como silabo de origen';
                }
    
                if ($hasComparacionesComoDestino) {
                    $motivos[] = 'comparaciones como silabo de destino';
                }
    
                // Construcción natural del mensaje (coma entre elementos y "y" antes del último)
                $motivoTexto = implode(', ', array_slice($motivos, 0, -1));
                
                if (count($motivos) > 1) {
                    $motivoTexto .= ' y ' . end($motivos);
                } else {
                    $motivoTexto = $motivos[0];
                }
    
                return response()->json([
                    'message' => "No se puede deshabilitar el silabo porque tiene $motivoTexto."
                ], 403);
            }

            $silabo->delete(); // Soft delete
    
            return response()->json([
                'message' => 'Silabo deshabilitado correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al deshabilitar el silabo con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }

    public function enableSilabo($idSilabo)
    {
        try {
            $silabo = Silabo::onlyTrashed()->findOrFail($idSilabo); // Buscar silabos eliminados lógicamente
          
            $silabo->restore();
          
            return response()->json([
                'message' => 'Silabo habilitado correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al habilitar el silabo con ID  $idSilabo. " . $e->getMessage()
            ], 500); 
        }
    }
    
    public function deleteSilabo($idSilabo)
    {
        try {
            $silabo = Silabo::withTrashed()->findOrFail($idSilabo); // Buscar incluso si está eliminado lógicamente
            
            $curso = $silabo->curso;

            $hasUnidades = $silabo->unidades()->exists();
            $hasBibliografias = $silabo->bibliografias()->exists();
            $hasComparacionesComoOrigen = $curso->comparacionesComoOrigen()->exists();
            $hasComparacionesComoDestino = $curso->comparacionesComoDestino()->exists();
            
            if ($hasUnidades || $hasBibliografias || $hasComparacionesComoOrigen || $hasComparacionesComoDestino) {

                $motivos = [];
    
                if ($hasUnidades) {
                    $motivos[] = 'unidades en su contenido';
                }
    
                if ($hasBibliografias) {
                    $motivos[] = 'bibliografías en su contenido';
                }
    
                if ($hasComparacionesComoOrigen) {
                    $motivos[] = 'comparaciones como silabo de origen';
                }
    
                if ($hasComparacionesComoDestino) {
                    $motivos[] = 'comparaciones como silabo de destino';
                }
    
                // Construcción natural del mensaje (coma entre elementos y "y" antes del último)
                $motivoTexto = implode(', ', array_slice($motivos, 0, -1));
                
                if (count($motivos) > 1) {
                    $motivoTexto .= ' y ' . end($motivos);
                } else {
                    $motivoTexto = $motivos[0];
                }
    
                return response()->json([
                    'message' => "No se puede eliminar el silabo porque tiene $motivoTexto."
                ], 403);
            }

            $silabo->forceDelete();
    
            return response()->json([
                'message' => 'Silabo eliminado correctamente'
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al eliminar el silabo con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }
}
