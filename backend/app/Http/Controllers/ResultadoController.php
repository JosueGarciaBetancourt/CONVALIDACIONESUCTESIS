<?php

namespace App\Http\Controllers;

use App\Models\Comparacion;
use Illuminate\Http\Request;

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
            $mensaje .= "Los cursos rechazados presentaron diferencias significativas en contenidos clave, metodologías o criterios de evaluación, ";
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
}
