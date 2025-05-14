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
                $puntuacion = 0.0;
                $maxPuntuacion = 0.0; // Para normalización
                
                // 1. Coincidencia exacta o muy cercana (combinando algoritmos)
                $similaridadTexto = 0;
                similar_text($nombreCurso, $termino['original'], $similaridadTexto);
                $distanciaLevenshtein = levenshtein($nombreCurso, $termino['original']);
                
                // Normalizar la similaridad (ya está en porcentaje 0-100)
                $similaridadNormalizada = $similaridadTexto / 100;
                
                // Normalizar la distancia Levenshtein (0-1, donde 0 es mejor coincidencia)
                $levenshteinNormalizado = $distanciaLevenshtein / max(strlen($nombreCurso), strlen($termino['original']));
                $levenshteinScore = 1 - min($levenshteinNormalizado, 1);
                
                // Combinación ponderada de ambas métricas
                $matchScore = ($similaridadNormalizada * 0.6) + ($levenshteinScore * 0.4);
                
                // Añadir al score total con un peso del 40%
                $puntuacion += $matchScore * 0.4;
                $maxPuntuacion += 0.4;
                
                // 2. Coincidencia por palabras individuales
                $wordScores = [];
                foreach ($termino['palabras'] as $palabra) {
                    // Coincidencia exacta de palabra
                    if (mb_strpos($nombreCurso, $palabra) !== false) {
                        $wordScores[] = 1.0; // Máxima puntuación por coincidencia exacta
                        continue;
                    }
                    
                    // Coincidencia aproximada
                    $palabrasCurso = explode(' ', $nombreCurso);
                    $bestWordScore = 0.0;
                    foreach ($palabrasCurso as $palabraCurso) {
                        $palabraCurso = trim($palabraCurso);
                        if (strlen($palabraCurso) > 2) {
                            // Usar ambos algoritmos para mayor precisión
                            $porcentajeSimilar = 0;
                            similar_text($palabraCurso, $palabra, $porcentajeSimilar);
                            $distanciaLev = levenshtein($palabraCurso, $palabra);
                            
                            // Normalizar scores
                            $similarNormalized = $porcentajeSimilar / 100;
                            $levNormalized = 1 - min($distanciaLev / max(strlen($palabraCurso), strlen($palabra)), 1);
                            
                            // Combinación ponderada
                            $currentScore = ($similarNormalized * 0.6) + ($levNormalized * 0.4);
                            $bestWordScore = max($bestWordScore, $currentScore);
                        }
                    }
                    
                    if ($bestWordScore > 0) {
                        $wordScores[] = $bestWordScore;
                    }
                }
                
                // Promedio de scores de palabras con un peso del 60%
                if (!empty($wordScores)) {
                    $averageWordScore = array_sum($wordScores) / count($wordScores);
                    $puntuacion += $averageWordScore * 0.6;
                    $maxPuntuacion += 0.6;
                }
                
                // Normalizar el score final si hay contribución de palabras
                $scoreFinal = $maxPuntuacion > 0 ? $puntuacion / $maxPuntuacion : 0;
                
                $umbralMinimo = env('TEXTUAL_SEARCH_UMBRAL', 0.5); // Solo considerar similitudes mayores al 50%
               
                if ($scoreFinal >= $umbralMinimo) {
                    $resultadosCursoActual[] = [
                        'curso' => $cursoMalla,
                        'similitud' => $scoreFinal
                    ];
                }
            }
            
            usort($resultadosCursoActual, function($a, $b) {
                return $b['similitud'] <=> $a['similitud'];
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
                    $cursoData['similitud'] = round($resultado['similitud'], 4);
                    
                    $resultadosPorCursoOriginal[$idOriginal][] = $cursoData;
                }
            }
        }
        
        // Procesar resultados finales eliminando duplicados
        $cursosProcesados = [];
        
        foreach ($resultadosPorCursoOriginal as $cursos) {
            foreach ($cursos as $curso) {
                $idCurso = $curso['idCurso'];
                
                // Si el curso no ha sido procesado o tiene mayor similitud que el anterior
                if (!isset($cursosProcesados[$idCurso]) || 
                    $curso['similitud'] > $cursosProcesados[$idCurso]['similitud']) {
                    $cursosProcesados[$idCurso] = $curso;
                }
            }
        }
        
        // Ordenar los resultados únicos por similitud descendente
        $resultadosFinales = array_values($cursosProcesados);
        usort($resultadosFinales, function($a, $b) {
            return $b['similitud'] <=> $a['similitud'];
        });
        
        return $resultadosFinales;
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

    /**
     * @param int $idGrupoTematico
     * @param array $cursosInput (id, nombre y sumilla)
     * @return array
    */
    public static function busquedaSemantica($idMalla, $idGrupoTematico, $cursosInput) 
    {
        try {
            // 1. Obtener los cursos del grupo temático
            $cursosPorMallaTema = Curso::with('silabo:idSilabo,idCurso,sumilla')
                                ->where(['idMalla' => $idMalla])
                                ->whereHas('cursosGruposTematicos', function($query) use ($idGrupoTematico) {
                                    $query->where('idGrupoTematico', $idGrupoTematico);
                                })
                                ->select('idCurso', 'idMalla', 'codigo', 'nombre')
                                ->get();    

            if ($cursosPorMallaTema->isEmpty()) {
                return [];
            }
            
            // 2. Preparar datos para el NLP
            $cursosOrigen = $cursosInput;

            $cursosGrupoTematico = $cursosPorMallaTema->map(function($curso) {
                return [
                    'idCurso' => $curso->idCurso,
                    'nombre' => $curso->nombre,
                    'sumilla' => $curso->silabo->sumilla ?? ''
                ];
            })->toArray();

            /* Log::info("CURSOS ORIGEN (input):");
            Controller::printJson($cursosOrigen);
            Log::info("POSIBLES CURSOS DESTINO:");
            Controller::printJson($cursosGrupoTematico); */

            Controller::printJson([
                'cursos_origen' => $cursosOrigen,
                'cursos_destino' => $cursosGrupoTematico
            ]);

            return [];

            // 3. Llamar al endpoint de NLP
            $resultados = self::NLPEndpoint([
                'cursos_origen' => $cursosOrigen,
                'cursos_destino' => $cursosGrupoTematico
            ]);

            Controller::printJson([
                'cursos_origen' => $cursosOrigen,
                'cursos_destino' => $cursosGrupoTematico
            ]);

            if (empty($resultados)) {
                return [];
            }

            // 4. Procesar resultados
            $mapaCursos = $cursosPorMallaTema->keyBy('idCurso');
            $cursosSimilares = [];

            foreach ($resultados['comparaciones'] as $comparacion) {
                $idCursoDestino = $comparacion['idCursoDestino'] ?? null;
                
                if (!$idCursoDestino || !isset($mapaCursos[$idCursoDestino])) {
                    continue;
                }

                $curso = $mapaCursos[$idCursoDestino];
                $similitud = $comparacion['similitud_total'] ?? 0;
                
                $cursosSimilares[] = [
                    'idCurso' => $idCursoDestino,
                    'idMalla' => $curso->idMalla,
                    'codigo' => $curso->codigo,
                    'nombre' => $curso->nombre,
                    'fueComparado' => 0,
                    'id_curso_original' => $comparacion['idCursoOrigen'] ?? null,
                    'puntuacion_similitud' => min(100, round($similitud * 100)),
                    'detalle_similitud' => [
                        'sumilla' => $comparacion['similitud_sumilla'] ?? 0,
                        'aprendizajes' => $comparacion['similitud_aprendizajes'] ?? 0,
                        'unidades' => $comparacion['similitud_unidades'] ?? 0
                    ]
                ];
            }

            // 5. Ordenar por puntuación
            usort($cursosSimilares, function($a, $b) {
                return $b['puntuacion_similitud'] <=> $a['puntuacion_similitud'];
            });

            return $cursosSimilares;
        } catch (\Exception $e) {
            Log::error('Error en búsqueda semántica: ' . $e->getMessage());
            return [];
        }
    }

    public static function NLPEndpoint($data) 
    {
        try {
            $client = new \GuzzleHttp\Client([
                'base_uri' => env('NLP_URL', 'http://127.0.0.1:5001'),
                'timeout' => 30.0,
                'connect_timeout' => 10.0,
                'http_errors' => false
            ]);

            // Preparar el formato que espera el endpoint Python
            $requestData = [
                'comparaciones' => [
                    [
                        'cursoOrigen' => [
                            'idCurso' => $data['cursos_origen'][0]['idCurso'] ?? null,
                            'nombre' => $data['cursos_origen'][0]['nombre'] ?? '',
                            'silabo' => [
                                'sumilla' => $data['cursos_origen'][0]['sumilla'] ?? ''
                            ]
                        ],
                        'cursoDestino' => [
                            'idCurso' => $data['cursos_destino'][0]['idCurso'] ?? null,
                            'nombre' => $data['cursos_destino'][0]['nombre'] ?? '',
                            'silabo' => [
                                'sumilla' => $data['cursos_destino'][0]['sumilla'] ?? ''
                            ]
                        ]
                    ]
                ]
            ];

            $response = $client->post('/comparar_cursos', [
                'json' => $requestData,
                'headers' => [
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json'
                ]
            ]);

            if ($response->getStatusCode() != 200) {
                Log::error("NLP API returned status: ".$response->getStatusCode());
                return [];
            }

            $result = json_decode($response->getBody(), true);

            if (empty($result['comparaciones'])) {
                Log::error("Invalid response format from NLP API");
                return [];
            }

            // Adaptar la respuesta al formato esperado por busquedaSemantica()
            return [
                'comparaciones' => array_map(function($item) {
                    return [
                        'idCursoOrigen' => $item['cursoOrigen']['idCurso'] ?? null,
                        'idCursoDestino' => $item['cursoDestino']['idCurso'] ?? null,
                        'similitud_total' => $item['resultado_resumido']['similitud_global'] ?? 0,
                        'similitud_sumilla' => $item['resultado_resumido']['similitud_sumilla'] ?? 0,
                        'similitud_aprendizajes' => $item['resultado_resumido']['similitud_aprendizajes'] ?? 0,
                        'similitud_unidades' => $item['resultado_resumido']['similitud_unidades'] ?? 0
                    ];
                }, $result['comparaciones'])
            ];

        } catch (\GuzzleHttp\Exception\ConnectException $e) {
            Log::error("NLP Connection failed: " . $e->getMessage());
            return [];
        } catch (\Exception $e) {
            Log::error("NLP API Error: " . $e->getMessage());
            return [];
        }
    } 
}
