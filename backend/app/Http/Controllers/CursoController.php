<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Malla;
use App\Models\Carrera;
use App\Models\Solicitud;
use App\Models\TemaComun;
use App\Models\Comparacion;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Models\GrupoTematico;
use App\Models\DetalleComparacion;
use App\Models\UnidadesComparadas;
use App\Models\UnidadSinParOrigen;
use Illuminate\Support\Facades\DB;
use App\Models\UnidadSinParDestino;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\TemaComunController;
use App\Models\EstadisticasDetalleComparacion;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\ComparacionController;
use App\Http\Requests\curso\CreateCursoRequest;
use App\Http\Requests\curso\UpdateCursoRequest;
use App\Http\Requests\curso\CompararCursosRequest;
use App\Http\Controllers\AlgoritmosBusquedaController;
use App\Http\Controllers\UnidadSinParOrigenController;
use App\Http\Requests\temaComun\CreateTemaComunRequest;
use App\Http\Requests\comparacion\CreateComparacionRequest;
use App\Http\Controllers\EstadisticasDetalleComparacionController;
use App\Http\Requests\detallecomparacion\CreateDetalleComparacionRequest;
use App\Http\Requests\unidadesComparadas\CreateUnidadesComparadasRequest;
use App\Http\Requests\unidadSinParOrigen\CreateUnidadSinParOrigenRequest;
use App\Http\Requests\unidadSinParDestino\CreateUnidadSinParDestinoRequest;
use App\Http\Requests\estadisticasDetalleComparacion\CreateEstadisticasDetalleComparacionRequest;

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

    public function getCoursesByMallaAndName(Request $request, $idMalla)
    {
        try {
            // Validar que la malla exista
           // Validar que el ID sea numérico
            $validator = Validator::make(['idMalla' => $idMalla], [
                'idMalla' => 'required|integer|exists:mallas,idMalla',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Malla no encontrada',
                    'errors' => $validator->errors()
                ], 404); // 404 es más apropiado para recursos no encontrados
            }

            // Query con filtro opcional
            $query = Curso::where('idMalla', $idMalla);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($search) . '%']);
            }

            $cursos = $query->paginate(15);

            return response()->json([
                'data' => $cursos->items(),
                'pagination' => [
                    'total' => $cursos->total(),
                    'current_page' => $cursos->currentPage(),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la malla con ID $idMalla. " . $e->getMessage()
            ], 500);
        }
    }
    
    public function getCoursesByMallaAndManyIds(Request $request, $idMalla)
    {
        try {
            // Validar existencia de la malla
            if (!Malla::where('idMalla', $idMalla)->exists()) {
                return response()->json(['error' => 'Malla no encontrada'], 404);
            }

            // Validar estructura del request - ahora solo esperamos un array de IDs
            $validator = Validator::make($request->all(), [
                'cursos' => 'required|array|min:1',
                'cursos.*' => 'required|integer'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors'  => $validator->errors()
                ], 422);
            }

            $cursosBuscadosIds = $request->input('cursos');

            // Si no hay IDs de cursos, devolvemos vacío
            if (empty($cursosBuscadosIds)) {
                return response()->json([
                    'data' => [],
                    'meta' => ['total' => 0]
                ]);
            }

            // Cargar los cursos por IDs para obtener sus nombres
            $cursosOriginales = Curso::whereIn('idCurso', $cursosBuscadosIds)->get();
            
            // Si no se encontraron cursos con esos IDs
            if ($cursosOriginales->isEmpty()) {
                return response()->json([
                    'error' => 'No se encontraron cursos con los IDs proporcionados'
                ], 404);
            }
            
            // Preparar los cursos para la búsqueda
            $cursosInput = [];
            foreach ($cursosOriginales as $curso) {
                $cursosInput[] = [
                    'id' => $curso->idCurso,
                    'nombre' => $curso->nombre
                ];
            }

            // Buscar cursos similares en la malla especificada
            $resultados = AlgoritmosBusquedaController::busquedaPorNombre($idMalla, $cursosInput);
            
            // Extraer IDs de cursos encontrados
            $cursosIdsEncontrados = array_unique(array_column($resultados, 'idCurso'));
            
            return response()->json([
                'data' => $resultados, // Solo los resultados directos
                'meta' => [
                    'total' => count($resultados),
                    'curso_ids_buscados' => $cursosBuscadosIds,
                    'curso_ids_encontrados' => array_values($cursosIdsEncontrados)
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error en la búsqueda: " . $e->getMessage()
            ], 500);
        }
    }

    public function getCoursesByMallaAndGrupoTematicoAndManyIdsNLP(Request $request, $idMalla)
    {
        try {
            // Validar existencia de la malla
            if (!Malla::where('idMalla', $idMalla)->exists()) {
                return response()->json(['error' => 'Malla no encontrada'], 404);
            }

            // Validar estructura del request
            $validator = Validator::make($request->all(), [
                'cursos' => 'required|array|min:1',
                'cursos.*.idCurso' => 'required|integer|exists:cursos,idCurso',
                'cursos.*.grupos_tematicos_ids' => 'nullable|array',
                'cursos.*.grupos_tematicos_ids.*' => 'nullable|integer|exists:grupostematicos,idGrupoTematico',
                'cursos_ids_encontrados_busqueda_textual' => 'nullable|array',
                'cursos_ids_encontrados_busqueda_textual.*' => 'nullable|integer|exists:cursos,idCurso',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $cursosBuscados = $request->input('cursos');
            $cursosNoBuscar = $request->input('cursos_ids_encontrados_busqueda_textual', []);

            // Cargar los cursos por IDs para obtener sus nombres y sumillas
            $cursosOriginales = Curso::with('silabo')
                ->whereIn('idCurso', array_column($cursosBuscados, 'idCurso'))
                ->get();

            if ($cursosOriginales->isEmpty()) {
                return response()->json([
                    'error' => 'No se encontraron cursos con los IDs proporcionados'
                ], 404);
            }

            // Preparar los cursos para la búsqueda
            $cursosInput = [];
            foreach ($cursosOriginales as $curso) {
                $cursosInput[] = [
                    'idCurso' => $curso->idCurso,
                    'nombre' => $curso->nombre,
                    'sumilla' => $curso->silabo->sumilla ?? '',
                ];
            }

            // Obtener todos los grupos temáticos únicos de los cursos buscados
            $gruposTematicosIds = array_unique(
                array_merge(
                    ...array_map(
                        fn($curso) => $curso['grupos_tematicos_ids'] ?? [],
                        $cursosBuscados
                    )
                )
            );

            // Buscar cursos similares en la malla especificada para cada grupo temático
            $resultadosUnicos = []; // Usaremos un array asociativo para evitar duplicados
            
            foreach ($gruposTematicosIds as $idGrupoTematico) {
                $resultados = AlgoritmosBusquedaController::busquedaSemantica(
                    $idMalla,
                    $idGrupoTematico,
                    $cursosInput,
                    $cursosNoBuscar
                );
                
                // Procesar resultados manteniendo solo la mejor coincidencia por curso
                foreach ($resultados as $resultado) {
                    $idCurso = $resultado['idCurso'];
                    
                    if (!isset($resultadosUnicos[$idCurso])) {
                        // Si el curso no existe, lo agregamos
                        $resultadosUnicos[$idCurso] = $resultado;
                    } else {
                        // Si ya existe, conservamos el que tenga mayor similitud
                        if ($resultado['similitud'] > $resultadosUnicos[$idCurso]['similitud']) {
                            $resultadosUnicos[$idCurso] = $resultado;
                        }
                    }
                }
            }

            // Convertir a array indexado y ordenar
            $resultadosFinales = array_values($resultadosUnicos);
            usort($resultadosFinales, function($a, $b) {
                return $b['similitud'] <=> $a['similitud'];
            });

            // Extraer IDs de cursos encontrados
            $cursosIdsEncontrados = array_keys($resultadosUnicos);

            return response()->json([
                'data' => $resultadosFinales,
                'meta' => [
                    'total' => count($resultadosFinales),
                    'curso_ids_buscados' => array_column($cursosBuscados, 'idCurso'),
                    'grupos_tematicos_buscados' => array_values($gruposTematicosIds), // Aseguramos array indexado
                    'cursos_ids_encontrados' => $cursosIdsEncontrados
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error en la búsqueda: " . $e->getMessage()
            ], 500);
        }
    }

    public function getCoursesSuggestionsToCompare(Request $request)
    {
        try {
            // Validar estructura del request JSON directamente
            $data = $request->json()->all();

            $validated = Validator::make($data, [
                'idMalla' => 'required|integer|exists:mallas,idMalla',
                'cursos' => 'required|array|min:1',
                'cursos.*.idCurso' => 'required|integer|exists:cursos,idCurso',
                'cursos.*.grupos_tematicos_ids' => 'required|array',
                'cursos.*.grupos_tematicos_ids.*' => 'required|integer|exists:grupostematicos,idGrupoTematico',
            ])->validate();

            $idMalla = $validated['idMalla'];
            $cursosGrupoTematico = $validated['cursos'];
            $cursosArray = collect($cursosGrupoTematico)->pluck('idCurso')->toArray();

            // Búsqueda textual
            $requestCursos = new Request([
                'cursos' => $cursosArray
            ]);
            
            $resultadosBusquedaTextual = $this->getCoursesByMallaAndManyIds($requestCursos, $idMalla);
            if (isset($resultadosBusquedaTextual->original['meta']['curso_ids_encontrados'])) {
                $curso_ids_encontrados = $resultadosBusquedaTextual->original['meta']['curso_ids_encontrados'];
            } else {
                $curso_ids_encontrados = [];
            }

            // Búsqueda NLP
            $requestCursosGruposTematicosIdsEncontrados = new Request([
                'cursos' => $cursosGrupoTematico,
                'cursos_ids_encontrados_busqueda_textual' => $curso_ids_encontrados
            ]);
            $resultadosBusquedaNLP = $this->getCoursesByMallaAndGrupoTematicoAndManyIdsNLP($requestCursosGruposTematicosIdsEncontrados, $idMalla);

            // Retornar resultados combinados
            return response()->json([
                'busqueda_textual' => $resultadosBusquedaTextual->original,
                'busqueda_nlp' => $resultadosBusquedaNLP->original
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error inesperado',
                'error' => $e->getMessage()
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

    public function getCoursePairForComparison($idCurso1, $idCurso2)
    {
        try {
            if (!$idCurso1 || !$idCurso2) {
                throw new \Exception("Debe proporcionar ambos ID de cursos para la comparación.");
            }

            // Traemos los cursos con sus relaciones
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

            // Validamos que existan ambos cursos
            if ($cursos->count() != 2) {
                return response()->json([
                    'message' => 'Uno o ambos cursos no existen.'
                ], 404);
            }

            // Ahora asignamos el curso origen y destino según su id
            $cursoOrigen = $cursos->firstWhere('idCurso', $idCurso1);
            $cursoDestino = $cursos->firstWhere('idCurso', $idCurso2);

            // Armamos el arreglo personalizado siguiendo la estructura del JSON proporcionado
            $resultado = [
                'comparaciones' => [
                    [
                        'cursoOrigen' => [
                            'idCurso' => $cursoOrigen->idCurso,
                            'nombre' => $cursoOrigen->nombre,
                            'silabo' => $cursoOrigen->silabo
                        ],
                        'cursoDestino' => [
                            'idCurso' => $cursoDestino->idCurso,
                            'nombre' => $cursoDestino->nombre,
                            'silabo' => $cursoDestino->silabo
                        ]
                    ]
                ]
            ];

            // Retornamos el JSON
            return response()->json($resultado);

        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el par de cursos. " . $e->getMessage()
            ], 500);
        }
    }

    public function getSomeCoursesForComparison(Request $request)
    {
        try {
            // Validamos que lleguen los pares correctamente
            $validatedData = $request->validate([
                'comparaciones' => 'required|array|min:1',
                'comparaciones.*.origen' => 'required|integer',
                'comparaciones.*.destino' => 'required|integer'
            ]);

            // Verificar combinaciones únicas
            $combinacionesVistas = [];
            $duplicados = [];

            foreach ($validatedData['comparaciones'] as $index => $comparacion) {
                $clave = $comparacion['origen'].'-'.$comparacion['destino'];
                
                if (in_array($clave, $combinacionesVistas)) {
                    $duplicados[] = [
                        'indice' => $index,
                        'origen' => $comparacion['origen'],
                        'destino' => $comparacion['destino']
                    ];
                } else {
                    $combinacionesVistas[] = $clave;
                }
            }

            // Si hay duplicados, retornar error
            if (!empty($duplicados)) {
                return response()->json([
                    'message' => 'Se encontraron combinaciones duplicadas.',
                    'duplicados' => $duplicados
                ], 422);
            }

            // Verificar autocomparaciones
            $autocomparaciones = [];
            foreach ($validatedData['comparaciones'] as $index => $comparacion) {
                if ($comparacion['origen'] == $comparacion['destino']) {
                    $autocomparaciones[] = [
                        'indice' => $index,
                        'curso_id' => $comparacion['origen']
                    ];
                }
            }

            // Si hay autocomparaciones, retornar error
            if (!empty($autocomparaciones)) {
                return response()->json([
                    'message' => 'No se permiten comparaciones de un curso consigo mismo.',
                    'autocomparaciones' => $autocomparaciones
                ], 422);
            }
            
            $comparaciones = $validatedData['comparaciones'];

            // Obtenemos todos los IDs únicos de cursos involucrados
            $idsCursos = collect($comparaciones)->pluck('origen')
                ->merge(collect($comparaciones)->pluck('destino'))
                ->unique()
                ->toArray();

            // Traemos los cursos con sus relaciones
            $cursos = Curso::select('idCurso', 'nombre')
                ->whereIn('idCurso', $idsCursos)
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

            // Verificamos si encontramos todos los cursos requeridos
            if ($cursos->count() != count($idsCursos)) {
                return response()->json([
                    'message' => 'Uno o más cursos no existen.'
                ], 404);
            }

            // Construimos las comparaciones siguiendo la estructura del JSON mostrado
            $resultadoComparaciones = [];

            foreach ($comparaciones as $par) {
                $cursoOrigen = $cursos->firstWhere('idCurso', $par['origen']);
                $cursoDestino = $cursos->firstWhere('idCurso', $par['destino']);

                if (!$cursoOrigen || !$cursoDestino) {
                    return response()->json([
                        'message' => "No se encontró uno de los cursos para la comparación."
                    ], 404);
                }

                $resultadoComparaciones[] = [
                    'cursoOrigen' => [
                        'idCurso' => $cursoOrigen->idCurso,
                        'nombre' => $cursoOrigen->nombre,
                        'silabo' => $cursoOrigen->silabo
                    ],
                    'cursoDestino' => [
                        'idCurso' => $cursoDestino->idCurso,
                        'nombre' => $cursoDestino->nombre,
                        'silabo' => $cursoDestino->silabo
                    ]
                ];
            }

            // Empaquetamos en la estructura final
            $resultado = [
                'comparaciones' => $resultadoComparaciones
            ];

            // Retornamos el JSON completo con todas las comparaciones
            return response()->json($resultado);

        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener los pares de cursos. " . $e->getMessage()
            ], 500);
        }
    }

    public function compararCursosNLP(CompararCursosRequest $request) {
        try {
            // REAL
            
            $validatedData = $request->validated();
            $idSolicitud = $validatedData['idSolicitud'];
            $comparacionesData = Arr::except($validatedData, 'idSolicitud');
            
            /* 

            $client = new \GuzzleHttp\Client([
                'base_uri' => env('NLP_URL', 'http://127.0.0.1:5000'),
                'timeout' => 120.0,
                'connect_timeout' => 10.0,
                'http_errors' => true
            ]);

            $response = $client->post('/comparar_cursos', [
                'json' => $comparacionesData,
                'headers' => [
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json'
                ]
            ]);

            $result = json_decode($response->getBody(), true); // Convertir a array asociativo ['atributo']

            // Verificar si se recibió respuesta válida
            if (!isset($result['status']) || $result['status'] !== 'success') {
                return [];
            }

            // Verificar si hay comparaciones
            if (empty($result['comparaciones'])) {
                return [];
            }

            $responseNLP = $result['comparaciones'];

            return response()->json($responseNLP);
            */

            // PRUEBA
            $json = file_get_contents(base_path('comparacion_output_NLP.json'));
            $responseNLP = json_decode($json, true); // Convertir a array asociativo ['atributo']
            $dataForUserReview = $this->fillOtherTables($idSolicitud, $responseNLP);

            return response()->json($dataForUserReview);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al realizar la comparación de cursos con PLN. " . $e->getMessage()
            ], 500);
        }
    }

    public function fillOtherTables($idSolicitud, $responseNLP) {
        try {
            foreach ($responseNLP as $response) {
                $idComparacion = $this->crear_comparacion($idSolicitud, $response);
                $idDetalleComparacion = $this->crear_detalleComparacion($idComparacion, $response);
                $this->crear_unidadesComparadasTemasComunes($idDetalleComparacion, $response);
                $this->crear_unidadSinParOrigen($idDetalleComparacion, $response);
                $this->crear_unidadSinParDestino($idDetalleComparacion, $response);
                $this->crear_estadisticasDetalleComparacion($idDetalleComparacion, $response);
                $idDetComp = $idDetalleComparacion;
            }

            // Agregar campos extra a la respuesta
            $solicitud = Solicitud::with(['comparaciones.detalleComparacion.estadisticas'])->findOrFail($idSolicitud);
            
            // Recopilar todas las estadísticas
            $estadisticasDetaleComparacion = [];
            $tiempo_total = 0;
            
            foreach ($solicitud->comparaciones as $comparacion) {
                if ($comparacion->detalleComparacion && $comparacion->detalleComparacion->estadisticas) {
                    $estadisticasDetaleComparacion[] = $comparacion->detalleComparacion->estadisticas;
                    $tiempo_total += $comparacion->detalleComparacion->estadisticas->tiempo_procesamiento_ms;
                }
            }
            
            $otros = [
                "estadisticas" => $estadisticasDetaleComparacion,
                "tiempo_total_procesamiento_ms" => $tiempo_total,
            ];

            $dataForUserReview = [
                "comparaciones" => $responseNLP,
                "otros" => $otros,
            ];

            return $dataForUserReview;
        } catch (\Exception $e) {
            throw new \Exception("Error al guardar los resultados de las comparaciones. ". $e);
        }
    }

    public function calcularSimilitudTOTAL($similitud_sumilla, $similitud_aprendizajes, $similitud_unidades, $similitud_bibliografia) {
        try {
            $peso_similitud_sumilla = env('PESO_SIMILUTD_SUMILLA', 0.25);
            $peso_similitud_aprendizajes = env('PESO_SIMILUTD_APRENDIZAJES', 0.15);
            $peso_similitud_unidades = env('PESO_SIMILUTD_UNIDADES', 0.5);
            $peso_similitud_bibliografia = env('PESO_SIMILUTD_BIBLIOGRAFIA', 0.10);

            $porcentaje_similitud_total = ($similitud_sumilla * $peso_similitud_sumilla) + ($similitud_aprendizajes * $peso_similitud_aprendizajes) +
                                          ($similitud_unidades * $peso_similitud_unidades) + ($similitud_bibliografia * $peso_similitud_bibliografia);                        
            
            return round($porcentaje_similitud_total, 2);
        } catch (\Exception $e) {
            throw new \Exception("Error al realizar el cálculo de similitud de los cursos.");
        }
    }

    public function crear_comparacion($idSolicitud, $data) {
        // Obtener reglas de validación
        $comparacionValidationRules = (new CreateComparacionRequest())->rules();

        // Calcular similitud de cursos
        $porcentaje_similitud = $this->calcularSimilitudTOTAL(
            $data['resultado_resumido']['similitud_sumilla'],
            $data['resultado_resumido']['similitud_aprendizajes'],
            $data['resultado_resumido']['similitud_unidades'],
            $data['resultado_resumido']['similitud_bibliografia']
        );

        // Calcular resultado (1: convalida ó 0: no convalida)
        $resultado = $porcentaje_similitud >= env('CONVALIDACION_UMBRAL', 0.75) ? 1 : 0;     

        // Crear registro en Comparaciones
        $comparacionData = [
            "idSolicitud" => $idSolicitud,
            "idCursoOrigen" => $data['idCursoOrigen'],
            "idCursoDestino" => $data['idCursoDestino'],
            "porcentaje_similitud" => $porcentaje_similitud,
            "resultado" => $resultado,
            "justificacion" => null
        ];

        // Validar los datos manualmente
        $validator = Validator::make($comparacionData, $comparacionValidationRules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Si pasa la validación, crear el registro
        $comparacion = Comparacion::create($comparacionData);
        $comparacionId = $comparacion->idComparacion;

        // Log::info("Comparación creada con ID: " . $comparacionId);

        return $comparacionId;
    }

    public function crear_detalleComparacion($idComparacion, $data) {
        // Obtener reglas de validación
        $detalleComparacionValidationRules = (new CreateDetalleComparacionRequest())->rules();

        // Calcular similitudes
        $similitud_sumilla = round($data['resultado_resumido']['similitud_sumilla'], 2);
        $similitud_aprendizajes = round($data['resultado_resumido']['similitud_aprendizajes'], 2);
        $similitud_unidades = round($data['resultado_resumido']['similitud_unidades'], 2);
        $similitud_bibliografia = round($data['resultado_resumido']['similitud_bibliografia'], 2);

        // Crear registro en Detalle Comparacion
        $detalleComparacionData = [
            "idComparacion" => $idComparacion,
            "similitud_sumilla" => $similitud_sumilla,
            "similitud_aprendizajes" => $similitud_aprendizajes,
            "similitud_unidades" => $similitud_unidades,
            "similitud_bibliografia" => $similitud_bibliografia
        ];

        // Validar los datos manualmente
        $validator = Validator::make($detalleComparacionData, $detalleComparacionValidationRules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Si pasa la validación, crear el registro
        $detalleComparacion = DetalleComparacion::create($detalleComparacionData);
        $detalleComparacionId = $detalleComparacion->idDetalleComparacion;

        // Log::info("Detalle de Comparación creada con ID: " . $detalleComparacionId);

        return $detalleComparacionId;
    }

    public function crear_unidadesComparadasTemasComunes($idDetalleComparacion, $data) {
        // Obtener reglas de validación
        $unidadesComparadasValidationRules = (new CreateUnidadesComparadasRequest())->rules();
        $temaComunValidationRules = (new CreateTemaComunRequest())->rules();

        $unidadesEmparejadas = $data['resultado_detallado']['unidades_emparejadas'];
        
        foreach ($unidadesEmparejadas as $unidEmp) {
            // Calcular similitudes
            $similitud_ponderada = round($unidEmp['similitud_ponderada'], 2);
            $similitud_titulo = round($unidEmp['similitud_titulo'], 2);
            $similitud_aprendizaje = round($unidEmp['similitud_aprendizaje'], 2);
            $similitud_temas = round($unidEmp['similitud_temas'], 2);
            
            // Crear registro en Unidades Comparadas
            $unidadesComparadasData = [
                "idDetalleComparacion" => $idDetalleComparacion,
                "idUnidadOrigen" => $unidEmp['id_unidad_origen'],
                "idUnidadDestino" => $unidEmp['id_unidad_destino'],
                "similitud_ponderada" => $similitud_ponderada,
                "similitud_titulo" => $similitud_titulo,
                "similitud_aprendizaje" => $similitud_aprendizaje,
                "similitud_temas" => $similitud_temas
            ];

            // Validar los datos manualmente
            $validator = Validator::make($unidadesComparadasData, $unidadesComparadasValidationRules);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            // Si pasa la validación, crear el registro
            $unidadesComparadas = UnidadesComparadas::create($unidadesComparadasData);
            $unidadesComparadasId = $unidadesComparadas->idUnidadesComparadas;

            // Log::info("Unidades Comparadas creada con ID: " . $unidadesComparadasId);

            // Crear registro en Temas Comunes
            $temasComunes = $unidEmp['temas_comunes'];
            if (!$temasComunes) continue;

            foreach ($temasComunes as $temaComun) {
                $temaComunData = [
                    'idUnidadesComparadas' => $unidadesComparadasId, 
                    'tema' => $temaComun['tema_comun'],
                ];
                
                // Validar los datos manualmente
                $validator = Validator::make($temaComunData, $temaComunValidationRules);
    
                if ($validator->fails()) {
                    throw new ValidationException($validator);
                }
                
                // Si pasa la validación, crear el registro
                $temaComun = TemaComun::create($temaComunData);
                $temaComunId = $temaComun->idTemaComun;
    
                // Log::info("Tema Común creado con ID: " . $temaComunId);
            }
        }
    }

    public function crear_unidadSinParOrigen($idDetalleComparacion, $data) {
        // Obtener reglas de validación
        $unidadSinParOrigenValidationRules = (new CreateUnidadSinParOrigenRequest())->rules();

        // Calcular similitudes
        $unidadesSinParOrigen = $data['resultado_detallado']['unidades_sin_par_origen'];
        if (!$unidadesSinParOrigen) return;

        foreach ($unidadesSinParOrigen as $uspo) {
            // Crear registro en UnidadSinParOrigen
            $unidadSinParOrigenData = [
                "idDetalleComparacion" => $idDetalleComparacion,
                "idUnidad" => $uspo['id_unidad']
            ];

            // Validar los datos manualmente
            $validator = Validator::make($unidadSinParOrigenData, $unidadSinParOrigenValidationRules);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            // Si pasa la validación, crear el registro
            $unidadSinParOrigen = UnidadSinParOrigen::create($unidadSinParOrigenData);
            $unidadSinParOrigenId = $unidadSinParOrigen->idUnidadSinParOrigen;

            // Log::info("Unidad Sin Par Origen creado con ID: " . $unidadSinParOrigenId);
        }
    }

    public function crear_unidadSinParDestino($idDetalleComparacion, $data) {
        // Obtener reglas de validación
        $unidadSinParDestinoValidationRules = (new CreateUnidadSinParDestinoRequest())->rules();

        // Calcular similitudes
        $unidadesSinParDestino = $data['resultado_detallado']['unidades_sin_par_destino'];
        if (!$unidadesSinParDestino) return;

        foreach ($unidadesSinParDestino as $uspd) {
            // Crear registro en UnidadSinParDestino
            $unidadSinParDestinoData = [
                "idDetalleComparacion" => $idDetalleComparacion,
                "idUnidad" => $uspd['id_unidad']
            ];

            // Validar los datos manualmente
            $validator = Validator::make($unidadSinParDestinoData, $unidadSinParDestinoValidationRules);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            // Si pasa la validación, crear el registro
            $unidadSinParDestino = UnidadSinParDestino::create($unidadSinParDestinoData);
            $unidadSinParDestinoId = $unidadSinParDestino->idUnidadSinParDestino;

            // Log::info("Unidad Sin Par Destino creado con ID: " . $unidadSinParDestinoId);
        }
    }

    public function crear_estadisticasDetalleComparacion($idDetalleComparacion, $data) {
        // Obtener reglas de validación
        $estadisticasDetalleComparacionValidationRules = (new CreateEstadisticasDetalleComparacionRequest())->rules();

        // Obtener campos
        $unidades_comparadas = UnidadesComparadas::where('idDetalleComparacion', $idDetalleComparacion)->get();
        $total_registros_unidades_comparadas = $unidades_comparadas->count();
        $total_unidades_comparadas = $total_registros_unidades_comparadas*2;

        $unidades_sin_par_origen = UnidadSinParOrigen::where('idDetalleComparacion', $idDetalleComparacion)->count();
        $unidades_sin_par_destino = UnidadSinParDestino::where('idDetalleComparacion', $idDetalleComparacion)->count();

        $total_unidades_origen = $total_registros_unidades_comparadas + $unidades_sin_par_origen;
        $total_unidades_destino = $total_registros_unidades_comparadas + $unidades_sin_par_destino;
        $porcentaje_emparejamiento_unidades = round($total_unidades_comparadas/($total_unidades_origen + $total_unidades_destino), 2);
        $total_temas_comunes = TemaComun::whereIn('idUnidadesComparadas', $unidades_comparadas->pluck('idUnidadesComparadas'))->count();
        $tiempo_procesamiento_ms = (int) round($data['tiempo_procesamiento_ms'], 0);

        // Crear registro en Detalle Comparacion
        $estadisticasDetalleComparacionData = [
            "idDetalleComparacion" => $idDetalleComparacion,
            "total_unidades_origen" => $total_unidades_origen,
            "total_unidades_destino" => $total_unidades_destino,
            "total_unidades_emparejadas" => $total_unidades_comparadas,
            "porcentaje_emparejamiento_unidades" => $porcentaje_emparejamiento_unidades,
            "total_temas_comunes" => $total_temas_comunes,
            "tiempo_procesamiento_ms" => $tiempo_procesamiento_ms
        ];

        // Validar los datos manualmente
        $validator = Validator::make($estadisticasDetalleComparacionData, $estadisticasDetalleComparacionValidationRules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Si pasa la validación, crear el registro
        $estadisticasDetalleComparacion = EstadisticasDetalleComparacion::create($estadisticasDetalleComparacionData);
        $estadisticasDetalleComparacionId = $estadisticasDetalleComparacion->idEstadisticasDetalleComparacion;

        // Log::info("Estadísticas Detalle Comparacion creada con ID: " . $estadisticasDetalleComparacionId);
    }

    public function createCurso(CreateCursoRequest $request)
    {

        DB::beginTransaction();
        
        try {
            // Después de recibir los datos de los cursos y sus sílabos...
        
            $msg = 'Cursos creados';

            $cursosData = $request->validated(); // Esperamos un array de cursos
            
            // Si recibimos un solo curso (no array), lo convertimos a array
            if (isset($cursosData['idMalla'])) {
                $msg = 'Curso creado';
                $cursosData = [$cursosData];
            }
            
            $cursosCreados = [];
            
            foreach ($cursosData as $cursoData) {
                $curso = Curso::create([
                    'idMalla' => $cursoData['idMalla'],
                    'nombre' => $cursoData['nombre'],
                ]);
                
                $cursosCreados[] = $curso;
            }
            
            DB::commit();
            
            return response()->json([
                'message' => "$msg correctamente",
                //'data' => $cursosCreados,
                //'count' => count($cursosCreados)
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'message' => "Error al crear los cursos. " . $e->getMessage()
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
