<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Malla;
use App\Models\Carrera;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\curso\CreateCursoRequest;
use App\Http\Requests\curso\UpdateCursoRequest;

class AlgoritmosBusquedaController extends Controller
{   
    /**
     * @param int $idMalla
     * @param array $cursosInput (id y nombre)
     * @return array
     */
    public static function busquedaPorNombre($idMalla, $cursosInput)
    {   
        //Log::info($cursosInput);

        // Lista de términos de búsqueda procesados
        $terminosProcesados = [];
        
        // Procesar cada término para optimizar la búsqueda
        foreach ($cursosInput as $cursoInput) {
            $idCursoOriginal = $cursoInput['id'];
            $termino = $cursoInput['nombre'];
            
            // Normalización avanzada del texto
            $termino = AlgoritmosBusquedaController::normalizarTexto($termino);
            
            // Dividir en palabras y filtrar stopwords
            $palabras = explode(' ', $termino);
            $palabrasFiltradas = [];
            
            foreach ($palabras as $palabra) {
                $palabra = trim($palabra);
                // Ignorar palabras muy cortas y stopwords comunes
                if (strlen($palabra) > 2 && !in_array($palabra, ['de', 'la', 'el', 'en', 'y', 'a', 'los', 'del', 'las', 'un', 'por', 'con', 'para'])) {
                    $palabrasFiltradas[] = $palabra;
                }
            }
            
            if (!empty($palabrasFiltradas)) {
                $terminosProcesados[] = [
                    'id_original' => $idCursoOriginal,
                    'original' => $termino,
                    'palabras' => $palabrasFiltradas
                ];
            }
        }
        
        if (empty($terminosProcesados)) {
            return [];
        }
        
        // Obtener cursos de la malla
        $cursosOriginalesIds = array_column($cursosInput, 'id');
        $cursosMalla = Curso::where('idMalla', $idMalla)
                        ->whereNotIn('idCurso', $cursosOriginalesIds)
                        ->get();
        
        if ($cursosMalla->isEmpty()) {
            return [];
        }
        
        $resultadosPorCursoOriginal = [];
        
        foreach ($terminosProcesados as $termino) {
            $idOriginal = $termino['id_original'];
            $resultadosCursoActual = [];
            
            foreach ($cursosMalla as $cursoMalla) {
                $nombreCurso = AlgoritmosBusquedaController::normalizarTexto($cursoMalla->nombre);
                $puntuacion = 0;
                
                // 1. Coincidencia exacta o muy cercana (combinando algoritmos)
                $similaridadTexto = 0;
                similar_text($nombreCurso, $termino['original'], $similaridadTexto);
                $distanciaLevenshtein = levenshtein($nombreCurso, $termino['original']);
                $longitudPromedio = (strlen($nombreCurso) + strlen($termino['original'])) / 2;
                
                // Combinación inteligente de ambos algoritmos
                if ($similaridadTexto > 80 || 
                    ($distanciaLevenshtein / $longitudPromedio) < 0.2) {
                    $puntuacion += 10;
                } elseif ($similaridadTexto > 70 || 
                        ($distanciaLevenshtein / $longitudPromedio) < 0.3) {
                    $puntuacion += 7;
                }
                
                // 2. Coincidencia por palabras individuales
                foreach ($termino['palabras'] as $palabra) {
                    // Coincidencia exacta de palabra
                    if (mb_strpos($nombreCurso, $palabra) !== false) {
                        $puntuacion += 5;
                        continue;
                    }
                    
                    // Coincidencia aproximada
                    $palabrasCurso = explode(' ', $nombreCurso);
                    foreach ($palabrasCurso as $palabraCurso) {
                        $palabraCurso = trim($palabraCurso);
                        if (strlen($palabraCurso) > 2) {
                            // Usar ambos algoritmos para mayor precisión
                            $porcentajeSimilar = 0;
                            similar_text($palabraCurso, $palabra, $porcentajeSimilar);
                            $distanciaLev = levenshtein($palabraCurso, $palabra);
                            
                            if ($porcentajeSimilar > 85 || $distanciaLev <= 1) {
                                $puntuacion += 4;
                            } elseif ($porcentajeSimilar > 75 || $distanciaLev <= 2) {
                                $puntuacion += 3;
                            } elseif ($porcentajeSimilar > 65 || $distanciaLev <= 3) {
                                $puntuacion += 1;
                            }
                        }
                    }
                }
                
                if ($puntuacion > 0) {
                    $resultadosCursoActual[] = [
                        'curso' => $cursoMalla,
                        'puntuacion' => $puntuacion
                    ];
                }
            }
            
            usort($resultadosCursoActual, function($a, $b) {
                return $b['puntuacion'] <=> $a['puntuacion'];
            });
            
            $resultadosCursoActual = array_slice($resultadosCursoActual, 0, 3);
            
            if (!empty($resultadosCursoActual)) {
                if (!isset($resultadosPorCursoOriginal[$idOriginal])) {
                    $resultadosPorCursoOriginal[$idOriginal] = [];
                }
                
                foreach ($resultadosCursoActual as $resultado) {
                    $curso = $resultado['curso'];
                    $cursoData = $curso->toArray();
                    $cursoData['id_curso_original'] = $idOriginal;
                    $cursoData['puntuacion_similitud'] = $resultado['puntuacion']; // Agregar puntuación
                    
                    $resultadosPorCursoOriginal[$idOriginal][] = $cursoData;
                }
            }
        }
        
        $resultadosFinales = [];
        foreach ($resultadosPorCursoOriginal as $cursos) {
            foreach ($cursos as $curso) {
                $resultadosFinales[] = $curso;
            }
        }
        
        // Ordenar resultados finales por puntuación descendente
        usort($resultadosFinales, function($a, $b) {
            return $b['puntuacion_similitud'] <=> $a['puntuacion_similitud'];
        });
        
        return $resultadosFinales;
    }

    /**
     * @param int $idGrupoTematico
     * @param array $cursosInput (id, nombre y sumilla)
     * @return array
     */
    public static function busquedaSemantica($idGrupoTematico, $cursosInput) 
    {
        try {
            // 1. Obtener los cursos de referencia del grupo temático
            $cursosPorTematica = Curso::where('idGrupoTematico', $idGrupoTematico)
                ->select('idCurso', 'idMalla', 'codigo', 'nombre', 'sumilla')
                ->get();
                
            if ($cursosPorTematica->isEmpty()) {
                return [];
            }
            
            // 2. Preparar datos para enviar al endpoint de comparación rápida
            $cursosEntrada = [];
            foreach ($cursosInput as $curso) {
                $cursosEntrada[] = [
                    'id' => $curso['id'],
                    'nombre' => $curso['nombre'],
                    'sumilla' => $curso['sumilla']
                ];
            }
            
            $cursosGrupoTematico = [];
            foreach ($cursosPorTematica as $curso) {
                $cursosGrupoTematico[] = [
                    'id' => $curso->idCurso,
                    'nombre' => $curso->nombre,
                    'sumilla' => $curso->sumilla
                ];
            }
            
            // 3. Llamar al endpoint simplificado de NLP
            $client = new \GuzzleHttp\Client();
            $response = $client->post('http://localhost:5001/comparar_cursos_simple', [
                'json' => [
                    'cursos_origen' => $cursosEntrada,
                    'cursos_destino' => $cursosGrupoTematico,
                    'configuracion' => [
                        'peso_nombre' => 0.4,     // 40% de importancia al nombre
                        'peso_sumilla' => 0.6,    // 60% de importancia a la sumilla
                        'umbral_similitud' => 0.5 // Umbral mínimo para considerar similitud
                    ]
                ],
                'timeout' => 60
            ]);
            
            $resultados = json_decode($response->getBody(), true);
            
            // 4. Procesar los resultados y formatear según la estructura requerida
            $cursosSimilares = [];
            
            // Crear un mapeo para acceso rápido a datos del curso por ID
            $mapaCursos = [];
            foreach ($cursosPorTematica as $curso) {
                $mapaCursos[$curso->idCurso] = $curso;
            }
            
            foreach ($resultados['comparaciones'] as $comparacion) {
                $idCursoDestino = $comparacion['id_curso_destino'];
                $idCursoOrigen = $comparacion['id_curso_origen'];
                
                // Verificar si el curso destino existe en nuestro mapa
                if (isset($mapaCursos[$idCursoDestino])) {
                    $curso = $mapaCursos[$idCursoDestino];
                    
                    // Convertir la similitud a una escala de 0-100 para la puntuación
                    // Asumiendo que la similitud viene en escala 0-1
                    $puntuacion = round($comparacion['similitud_total'] * 100);
                    
                    // Limitar la puntuación a un máximo de 100
                    $puntuacion = min(100, $puntuacion);
                    
                    $cursosSimilares[] = [
                        'idCurso' => $idCursoDestino,
                        'idMalla' => $curso->idMalla,
                        'codigo' => $curso->codigo,
                        'nombre' => $curso->nombre,
                        'fueComparado' => 0,  // Por defecto asignamos 0
                        'id_curso_original' => $idCursoOrigen,
                        'puntuacion_similitud' => $puntuacion
                    ];
                }
            }
            
            // 5. Ordenar resultados por puntuación de similitud (descendente)
            usort($cursosSimilares, function($a, $b) {
                return $b['puntuacion_similitud'] <=> $a['puntuacion_similitud'];
            });
            
            return $cursosSimilares;
            
        } catch (\Exception $e) {
            Log::error('Error en búsqueda semántica: ' . $e->getMessage());
            return [];
        }
    }

    public static function normalizarTexto($texto)
    {
        // Convertir a minúsculas
        $texto = mb_strtolower(trim($texto), 'UTF-8');
        
        // Eliminar tildes y caracteres diacríticos
        $texto = iconv('UTF-8', 'ASCII//TRANSLIT', $texto);
        
        // Reemplazar caracteres especiales y múltiples espacios
        $texto = preg_replace('/[^\w\d]+/', ' ', $texto);
        
        // Normalizar números romanos y abreviaturas comunes
        $texto = str_replace([' ii ', ' iii ', ' iv '], [' 2 ', ' 3 ', ' 4 '], ' '.$texto.' ');
        
        return trim($texto);
    }
    

    public static function a($texto) 
    {
        return;
    }   
}
