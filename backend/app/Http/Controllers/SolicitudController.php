<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Solicitud;
use App\Models\DetalleComparacion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\solicitud\CreateSolicitudRequest;
use App\Models\EstadisticasDetalleComparacion;
use App\Models\TemasComunes;
use App\Models\UnidadesComparadas;
use App\Models\UnidadesSinParDestino;
use App\Models\UnidadesSinParOrigen;

class SolicitudController extends Controller
{
    public function getSolicitudes()
    {
        try {
            $solicitudes = Solicitud::all();
            return response()->json($solicitudes, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener solicitudes. " . $e->getMessage()
            ], 500);
        }
    }

    public function getSolicitud($idSolicitud)
    {
        try {
            $solicitud = Solicitud::findOrFail($idSolicitud);
            return response()->json($solicitud, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la solicitud con ID $idSolicitud. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedSolicitudes() {
        try {
            $solicitudes = Solicitud::onlyTrashed()->get();
            return response()->json($solicitudes, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener las solicitudes deshabilitadas. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedSolicitud($idSilabo)
    {
        try {
            $solicitud = Solicitud::onlyTrashed()->findOrFail($idSilabo);
            return response()->json($solicitud, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener la solicitud deshabilitada con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }
    
    public static function returnNuevoCodigoSolicitud($idSolicitud=null) {
        if ($idSolicitud) {
            return 'SOLI-'. str_pad($idSolicitud, 4, '0', STR_PAD_LEFT);
        }

        $lastNumberSolicitudID = Solicitud::max('idSolicitud');
        
        if (!$lastNumberSolicitudID) {
            return 'SOLI-0001';
        }

        $newNumberSolicitudID = $lastNumberSolicitudID + 1;
        $newCodigoSolicitud = 'SOLI-'. str_pad($newNumberSolicitudID, 4, '0', STR_PAD_LEFT);
        return $newCodigoSolicitud;
    }

    public function createSolicitud(CreateSolicitudRequest $request)
    {
        try {
            $data = $request->validated();
            $codigo = $this::returnNuevoCodigoSolicitud();

            $solicitud = Solicitud::create([
                'codigo' => $codigo,
                'idEstudiante' => $data['idEstudiante'],
                'idCarreraDestino' => $data['idCarreraDestino'],
                'idMallaConvalidar' => $data['idMallaConvalidar'],
                'idUsuarioEvaluador' => Auth::id(),
            ]);
                        
            /* $token = request()->bearerToken(); 
            Log::info($token); */
                        
            return response()->json([
                'message' => 'Solicitud creada correctamente',
                'data' => $solicitud
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear la solicitud. " . $e->getMessage()
            ], 500);
        }
    }

    // updateSolicitud, se implementará según el avance del frontend
    
    public function disableSolicitud($idSolicitud)
    {
        DB::beginTransaction();

        try {
            // Cargar la solicitud con las relaciones necesarias
            $solicitud = Solicitud::with([
                'comparaciones.detalleComparacion.estadisticas',
                'comparaciones.detalleComparacion.unidadesComparadas.temasComunes',
                'comparaciones.detalleComparacion.unidadesSinParOrigen',
                'comparaciones.detalleComparacion.unidadesSinParDestino',
                'resultado'
            ])->findOrFail($idSolicitud);

            // Usar colecciones y encadenamiento de métodos para eliminar registros relacionados
            $solicitud->comparaciones->each(function ($comparacion) {
                if ($detalle = $comparacion->detalleComparacion) {
                    // Eliminar estadísticas
                    optional($detalle->estadisticas)->delete();
                    
                    // Eliminar temas comunes y unidades comparadas
                    $detalle->unidadesComparadas->each(function ($unidadComparada) {
                        $unidadComparada->temasComunes->each->delete();
                        $unidadComparada->delete();
                    });
                    
                    // Eliminar unidades sin par
                    $detalle->unidadesSinParOrigen->each->delete();
                    $detalle->unidadesSinParDestino->each->delete();
                    
                    // Eliminar el detalle
                    $detalle->delete();
                }
                // Eliminar la comparación
                $comparacion->delete();
            });

            // Eliminar el resultado
            optional($solicitud->resultado)->delete();
            
            // Eliminar la solicitud
            $solicitud->delete();

            DB::commit();

            return response()->json([
                'message' => 'Solicitud y todos sus datos relacionados eliminados correctamente'
            ], 200);
            
        } catch (\Exception $e) {
            DB::rollBack(); 
            return response()->json([
                'message' => "Error al eliminar la solicitud con ID $idSolicitud: " . $e->getMessage()
            ], 500); 
        }
    }

    public function enableSolicitud($idSolicitud)
    {
        DB::beginTransaction();

        try {
            // Cargar la solicitud con las mismas relaciones que en disableSolicitud
            $solicitud = Solicitud::onlyTrashed()
                ->with([
                    'comparaciones' => function ($query) {
                        $query->withTrashed()->with([
                            'detalleComparacion' => function ($subQuery) {
                                $subQuery->withTrashed()->with([
                                    'estadisticas' => function ($q) {
                                        $q->withTrashed();
                                    },
                                    'unidadesComparadas' => function ($q) {
                                        $q->withTrashed()->with([
                                            'temasComunes' => function ($q) {
                                                $q->withTrashed();
                                            }
                                        ]);
                                    },
                                    'unidadesSinParOrigen' => function ($q) {
                                        $q->withTrashed();
                                    },
                                    'unidadesSinParDestino' => function ($q) {
                                        $q->withTrashed();
                                    }
                                ]);
                            }
                        ]);
                    },
                    'resultado' => function ($query) {
                        $query->withTrashed();
                    }
                ])
                ->findOrFail($idSolicitud);

            // Restaurar todas las relaciones recursivamente
            $solicitud->comparaciones->each(function ($comparacion) {
                if ($detalle = $comparacion->detalleComparacion) {
                    // Restaurar estadísticas
                    optional($detalle->estadisticas)->restore();
                    
                    // Restaurar unidades comparadas y sus temas comunes
                    $detalle->unidadesComparadas->each(function ($unidadComparada) {
                        $unidadComparada->temasComunes->each->restore();
                        $unidadComparada->restore();
                    });
                    
                    // Restaurar unidades sin par
                    $detalle->unidadesSinParOrigen->each->restore();
                    $detalle->unidadesSinParDestino->each->restore();
                    
                    // Restaurar el detalle
                    $detalle->restore();
                }
                // Restaurar la comparación
                $comparacion->restore();
            });

            // Restaurar el resultado
            optional($solicitud->resultado)->restore();
            
            // Restaurar la solicitud
            $solicitud->restore();

            DB::commit();

            return response()->json([
                'message' => 'Solicitud y todos sus datos relacionados restaurados correctamente'
            ], 200);
            
        } catch (\Exception $e) {
            DB::rollBack(); 
            return response()->json([
                'message' => "Error al restaurar la solicitud con ID $idSolicitud: " . $e->getMessage()
            ], 500); 
        }
    }
}
