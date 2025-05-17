<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Resultado;
use App\Models\Solicitud;
use Illuminate\Database\Seeder;
use App\Http\Controllers\ResultadoController;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ResultadoSeeder extends Seeder
{
    public function run(): void
    {   
        $evaluador1 = Solicitud::find(1)?->user; // Relación en el modelo Solicitud
        $evaluador2 = Solicitud::find(2)?->user;

        $resultados = [
            [   
                'idResultado' => 1,
                'idSolicitud' => 1,
                'totalCursosEvaluados' => 1,
                'cursosConvalidados' => 0,
                'cursosRechazados' => 1,
                'totalCreditosEvaluados' => 3,
                'creditosConvalidados' => 0,
                'creditosRechazados' => 3 ,
                'porcentajeSimilitudPromedio' => ResultadoController::getPorcentajeSimilitudPromedioByIdSolicitud(1),
                'observacionesGenerales' => ResultadoController::getObservacionesGenerales(1, 0, 1, 3, 0, 3),
                'idUser' => $evaluador1->id,
                'responsableEvaluacion' => $evaluador1->personal_name,
                'cargoResponsable' => $evaluador1->cargo,
                'correoResponsable' => $evaluador1->corporative_email,
                'DNI' => $evaluador1->DNI,
            ],
           /*  [   
                'idResultado' => 2,
                'idSolicitud' => 2,
                'totalCursosEvaluados' => 1,
                'cursosConvalidados' => 1,
                'cursosRechazados' => 0,
                'totalCreditosEvaluados' => 4,
                'creditosConvalidados' => 4,
                'creditosRechazados' => 0,
                'porcentajeSimilitudPromedio' => ResultadoController::getPorcentajeSimilitudPromedioByIdSolicitud(2),
                'observacionesGenerales' => ResultadoController::getObservacionesGenerales(1, 1, 0, 4, 4, 0),
                'idUser' => $evaluador2->id,
                'responsableEvaluacion' => $evaluador2->personal_name,
                'cargoResponsable' => $evaluador2->cargo,
                'correoResponsable' => $evaluador2->corporative_email,
                'DNI' => $evaluador2->DNI,
            ], */
        ];

        foreach ($resultados as $resultado) {
            Resultado::create($resultado);
        }
    }
}
