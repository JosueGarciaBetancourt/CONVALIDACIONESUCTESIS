<?php

namespace App\Http\Controllers;

use App\Models\Resultado;
use App\Models\Comparacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\resultado\CreateResultadoRequest;

class ResultadoController extends Controller
{   
    public static function getObservacionesGenerales($totalCursosEvaluados, $totalCursosConvalidados, $totalCursosRechazados,
                                                    $totalCreditosEvaluados, $totalCreditosConvalidados, $totalCreditosRechazados) {
        // Evitar divisiones por cero
        if ($totalCursosEvaluados == 0 || $totalCreditosEvaluados == 0) {
            return "No se registraron cursos ni créditos para evaluar. Por favor, revise los datos ingresados.";
        }

        // Calcular porcentajes
        $porcentajeCursosConvalidados = round(($totalCursosConvalidados / $totalCursosEvaluados) * 100, 2);
        $porcentajeCreditosConvalidados = round(($totalCreditosConvalidados / $totalCreditosEvaluados) * 100, 2);

        // Generar mensaje
        $mensaje = "El estudiante ha obtenido una convalidación satisfactoria de {$totalCursosConvalidados} ";
        $mensaje .= $totalCursosConvalidados === 1 ? "curso" : "cursos";
        $mensaje .= ", lo que representa un {$porcentajeCursosConvalidados}% del total de cursos evaluados ({$totalCursosEvaluados}).\n\n";

        $mensaje .= "A nivel de créditos, se convalidaron {$totalCreditosConvalidados} ";
        $mensaje .= $totalCreditosConvalidados === 1 ? "crédito" : "créditos";
        $mensaje .= ", de un total de {$totalCreditosEvaluados}, lo que representa un {$porcentajeCreditosConvalidados}%.\n\n";

        if ($totalCursosRechazados > 0) {
            $mensaje .= "Los cursos rechazados presentaron diferencias significativas en sumilla, apredizajes, contenido de unidades y bibliografía, ";
            $mensaje .= "lo cual impidió su convalidación según las políticas académicas establecidas.\n";
        } else {
            $mensaje .= "No se identificaron cursos rechazados, lo que indica una alta correspondencia entre los programas evaluados.";
        }

        return $mensaje;
    }   

    public static function getPorcentajeSimilitudPromedioByIdSolicitud($idSolicitud) {
        $porcentajesSimilitudComparaciones = Comparacion::where('idSolicitud', $idSolicitud)->pluck('porcentaje_similitud');
        $porcentajeSimilitudPromedio = $porcentajesSimilitudComparaciones->avg();
        return $porcentajeSimilitudPromedio;
    }

    public function getResultados()
    {
        try {
            $resultados = Resultado::all();
            return response()->json($resultados, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener resultados. " . $e->getMessage()
            ], 500);
        }
    }

    public function getResultado($idResultado)
    {
        try {
            $solicitud = Resultado::findOrFail($idResultado);
            return response()->json($solicitud, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el resultado con ID $idResultado. " . $e->getMessage()
            ], 500);
        }
    }

    public function getTrashedResultados() {
        try {
            $resultados = Resultado::onlyTrashed()->get();
            return response()->json($resultados, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener los resultados deshabilitados. " . $e->getMessage()
            ], 500); 
        }
    }

    public function getTrashedResultado($idSilabo)
    {
        try {
            $resultado = Resultado::onlyTrashed()->findOrFail($idSilabo);
            return response()->json($resultado, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error al obtener el resultado deshabilitado con ID $idSilabo. " . $e->getMessage()
            ], 500);
        }
    }

    public function createResultado(CreateResultadoRequest $request)
    {
        $data = $request->prepareResultadoData();
        
        if ($data === null) {
            return response()->json([
                'message' => $request->getErrorMessage(),
                'error' => true
            ], 422);
        }
        
        try {
            $resultado = Resultado::create($data);

            return response()->json([
                'message' => 'Resultado creado correctamente',
                'resultado' => $resultado
            ], 201);
        } catch (\Exception $e) {
            Log::error("Error al crear resultado: " . $e->getMessage());
            
            return response()->json([
                'message' => "Error al crear el resultado. " .  $e->getMessage(),
                'error' => true
            ], 500);
        }
    }
}
