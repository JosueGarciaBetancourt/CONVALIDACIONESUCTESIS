<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Solicitud;
use App\Models\DetalleComparacion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\solicitud\CreateSolicitudRequest;

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
    
    public function returnNuevoCodigoSolicitud() {
        $lastNumberSolicitudID = Solicitud::max('idSolicitud');
        
        if (!$lastNumberSolicitudID) {
            return 'SOLI-01';
        }

        $newNumberSolicitudID = $lastNumberSolicitudID + 1;
        $newCodigoSolicitud = 'SOLI-'. str_pad($newNumberSolicitudID, 4, '0', STR_PAD_LEFT);
        return $newCodigoSolicitud;
    }

    public function createSolicitud(CreateSolicitudRequest $request)
    {
        try {
            $data = $request->validated();
            $codigo = $this->returnNuevoCodigoSolicitud();

            Solicitud::create([
                'codigo' => $codigo,
                'idEstudiante' => $data['idEstudiante'],
                'idCarreraDestino' => $data['idCarreraDestino'],
                'idUsuarioEvaluador' => Auth::id(),
            ]);
                        
            /* $token = request()->bearerToken(); 
            Log::info($token); */
                        
            return response()->json([
                'message' => 'Solicitud creada correctamente'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al crear la solicitud. " . $e->getMessage()
            ], 500);
        }
    }

    public function disableSolicitud($idSolicitud)
    {
        DB::beginTransaction();

        try {
            $solicitud = Solicitud::with([
                'comparaciones.detalleComparacion',
                'resultado'
            ])->findOrFail($idSolicitud);

            foreach ($solicitud->comparaciones as $comparacion) {
                $detalle = $comparacion->detalleComparacion;
                if ($detalle instanceof DetalleComparacion) {
                    $detalle->delete();
                }
                $comparacion->delete();
            }

            if ($solicitud->resultado) {
                $solicitud->resultado->delete();
            }

            $solicitud->delete();

            DB::commit();

            return response()->json([
                'message' => 'Solicitud, comparaciones, detalles y resultado deshabilitados correctamente'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack(); 
            return response()->json([
                'message' => "Error al deshabilitar la solicitud con ID  $idSolicitud. " . $e->getMessage()
            ], 500); 
        }
    }

    public function enableSolicitud($idSolicitud)
    {
        DB::beginTransaction();

        try {
            $solicitud = Solicitud::onlyTrashed()
            ->with([
                'comparaciones' => function ($query) {
                    $query->withTrashed()->with([
                        'detalleComparacion' => function ($subQuery) {
                            $subQuery->withTrashed();
                        }
                    ]);
                },
                'resultado' => function ($query) {
                    $query->withTrashed();
                }
            ])
            ->findOrFail($idSolicitud);
        
            Controller::printJSON($solicitud);

            foreach ($solicitud->comparaciones as $comparacion) {
                $detalle = $comparacion->detalleComparacion;
                if ($detalle instanceof DetalleComparacion && $detalle->trashed()) {
                    $detalle->restore();
                }
                $comparacion->restore();
            }

            if ($solicitud->resultado && $solicitud->resultado->trashed()) {
                $solicitud->resultado->restore();
            }

            $solicitud->restore();

            DB::commit();

            return response()->json([
                'message' => 'Solicitud, comparaciones, detalles y resultado habilitados correctamente'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack(); 
            return response()->json([
                'message' => "Error al habilitar la solicitud con ID  $idSolicitud. " . $e->getMessage()
            ], 500); 
        }
    }
}
