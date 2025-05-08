<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Malla;
use App\Models\Carrera;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\curso\CreateCursoRequest;
use App\Http\Requests\curso\UpdateCursoRequest;

class CursoController extends Controller
{   
    public function getCursos()
    {
        try {
            $cursos = Curso::all();

            return response()->json($cursos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener cursos. " . $e->getMessage()
            ], 500);
        }
    }

    public function getCurso($idCurso)
    {
        try {
            $curso = Curso::findOrFail($idCurso);
            return response()->json($curso, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el curso con ID $idCurso. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedCursos() {
        try {
            $cursos = Curso::onlyTrashed()->get();
            return response()->json($cursos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener los cursos deshabilitados. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedCurso($idCurso)
    {
        try {
            $curso = Curso::onlyTrashed()->findOrFail($idCurso);
            return response()->json($curso, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el curso deshabilitado con ID $idCurso. " . $e->getMessage()
            ], 500);
        }
    }

    public function getCoursePairForComparison($idCurso1, $idCurso2)
    {
        try {
            $cursos = Curso::select('idCurso', 'nombre')
                ->whereIn('idCurso', [$idCurso1, $idCurso2])
                ->with([
                    'silabo' => function($query) {
                        $query->select('idSilabo', 'idCurso', 'sumilla', 'aprendizaje_general');
                    },
                    'silabo.unidades' => function($query) {
                        $query->select('idUnidad', 'idSilabo', 'numero', 'titulo', 'duracion_semanas', 'aprendizajes', 'temas');
                    },
                    'silabo.bibliografias' => function($query) {
                        $query->select('idBibliografia', 'idSilabo', 'referencia', 'url');
                    }
                ])
                ->get();
    
            return response()->json($cursos);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener los cursos. " . $e->getMessage()
            ], 500);
        }
    }

    public function getCursoSilaboUnidadBibliografia($idCurso)
    {
        try {
            $curso = Curso::select('idCurso', 'nombre')
                    ->with([
                        'silabo' => function($query) {
                            $query->select();
                        },
                        'silabo.unidades' => function($query) {
                            $query->select();
                        },
                        'silabo.bibliografias' => function($query) {
                            $query->select();
                        }
                    ])
                    ->findOrFail($idCurso);
            return response()->json($curso);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el curso con su silabo, unidades y bibliografia con ID $idCurso. " . $e->getMessage()
            ], 500);
        }
    }

    public function createCurso(CreateCursoRequest $request)
    {
        try {
            $data = $request->validated();

            Curso::create([
                'idMalla' => $data['idMalla'],
                'nombre' => $data['nombre'],
            ]);

            return response()->json([
                'message' => 'Curso parcialmente creado correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear el curso. " . $e->getMessage()
            ], 500);
        }
    }

    public function updateCurso(UpdateCursoRequest $request, $idCurso)
    {
        try {
            $data = $request->validated();

            if (empty($data)) {
                return response()->json([
                    'message' => 'No se enviaron datos para actualizar.'
                ], 400);
            }

            $curso = Curso::findOrFail($idCurso);

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
                    'message' => "No se puede actualizar el curso porque tiene $motivoTexto."
                ], 403);
            }

            $curso->update($data);

            return response()->json([
                'message' => 'Curso actualizado correctamente'
            ], 200);  
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al actualizar el curso con ID $idCurso. " . $e->getMessage()
            ], 500);
        }
    }

    public function disableCurso($idCurso)
    {
        try {
            $curso = Curso::findOrFail($idCurso); // Solo cursos activos (no eliminados lógicamente)

            $hasSilabo = $curso->silabo()->exists();
            $hasComparacionesComoOrigen = $curso->comparacionesComoOrigen()->exists();
            $hasComparacionesComoDestino = $curso->comparacionesComoDestino()->exists();

            if ($hasSilabo || $hasComparacionesComoOrigen || $hasComparacionesComoDestino) {

                $motivos = [];
    
                if ($hasSilabo) {
                    $motivos[] = 'un sílabo asociado';
                }
    
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
                    'message' => "No se puede deshabilitar el curso porque tiene $motivoTexto."
                ], 403);
            }

            $curso->delete(); // Soft delete
    
            return response()->json([
                'message' => 'Curso deshabilitado correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al deshabilitar el curso con ID $idCurso. " . $e->getMessage()
            ], 500);
        }
    }

    public function enableCurso($idCurso)
    {
        try {
            $curso = Curso::onlyTrashed()->findOrFail($idCurso); // Buscar cursos eliminados lógicamente
          
            $curso->restore();
          
            return response()->json([
                'message' => 'Curso habilitado correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al habilitar el curso con ID  $idCurso. " . $e->getMessage()
            ], 500); 
        }
    }
    
    public function deleteCurso($idCurso)
    {
        try {
            $curso = Curso::withTrashed()->findOrFail($idCurso); // Buscar incluso si está eliminado lógicamente
            
            $hasSilabo = $curso->silabo()->exists();
            $hasComparacionesComoOrigen = $curso->comparacionesComoOrigen()->exists();
            $hasComparacionesComoDestino = $curso->comparacionesComoDestino()->exists();

            if ($hasSilabo || $hasComparacionesComoOrigen || $hasComparacionesComoDestino) {

                $motivos = [];
    
                if ($hasSilabo) {
                    $motivos[] = 'un sílabo asociado';
                }
    
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
                    'message' => "No se puede eliminar el curso porque tiene $motivoTexto."
                ], 403);
            }

            $curso->forceDelete();
    
            return response()->json([
                'message' => 'Curso eliminado correctamente'
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al eliminar el curso con ID $idCurso. " . $e->getMessage()
            ], 500);
        }
    }

    /* Para estandarizar el código de un curso se usará la siguiente estructura:
        → Cursos locales:
            Abreviatura_Universidad-Abreviatura_Carrera-Codigo_Silabo-Anio_Silabo-Electivo/Obligatorio
        → Cursos foráneos:
            Abreviatura_Universidad-Abreviatura_Carrera-Codigo_Silabo-Anio_Silabo
    */
    public static function generateCodigoCurso($silabo_object) {
        // Relación al curso
        $curso = $silabo_object->curso;

        // Accedemos a la malla y carrera asociadas
        $malla = $curso->malla;
        $carrera = $malla->carrera;

        // Abreviatura completa (ya incluye universidad y carrera)
        $codigoCarrera = $carrera->codigo;

        // Código base: Abre_Carrera - Código del curso - Año del sílabo
        $codigoCurso = "{$codigoCarrera}-{$silabo_object->codigo}-{$silabo_object->anio}";

        // Si es carrera local (Universidad Continental, idCarrera = 1) y tiene carácter definido
        if ((int)$carrera->idCarrera === 1 && $silabo_object->caracter) {
            $codigoCurso .= '-' . $silabo_object->caracter; // Agrega "Electivo" u "Obligatorio"
        }

        return $codigoCurso;
    }
}
