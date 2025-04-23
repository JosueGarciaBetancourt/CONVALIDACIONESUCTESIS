<?php

namespace Database\Seeders;

use App\Models\Malla;
use App\Models\Solicitud;
use Illuminate\Database\Seeder;
use App\Http\Controllers\SolicitudController;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SolicitudSeeder extends Seeder
{
    public function run(): void
    {
        $solicitudes = [
            [   
                'idSolicitud' => 1,
                'codigo' => SolicitudController::returnNuevoCodigoSolicitud(1),
                'idEstudiante' => 2,
                'idCarreraDestino' => 1,
                'idMallaConvalidar' => Malla::where('idCarrera', 1)->value('idMalla'),
                'idUsuarioEvaluador' => 1,
            ],
            [   
                'idSolicitud' => 2,
                'codigo' => SolicitudController::returnNuevoCodigoSolicitud(2),
                'idEstudiante' => 3,
                'idCarreraDestino' => 1,
                'idMallaConvalidar' => Malla::where('idCarrera', 1)->value('idMalla'),
                'idUsuarioEvaluador' => 2,
            ],  
            [   
                'idSolicitud' => 3,
                'codigo' => SolicitudController::returnNuevoCodigoSolicitud(3),
                'idEstudiante' => 1,
                'idCarreraDestino' => 1,
                'idMallaConvalidar' => Malla::where('idCarrera', 1)->value('idMalla'),
                'idUsuarioEvaluador' => 2,
            ],  
            // Solicitud de prueba
            [   
                'idSolicitud' => 4,
                'codigo' => SolicitudController::returnNuevoCodigoSolicitud(4),
                'idEstudiante' => 3,
                'idCarreraDestino' => 3,
                'idMallaConvalidar' => Malla::where('idCarrera', 3)->value('idMalla'),
                'idUsuarioEvaluador' => 1,
            ],  
        ];

        foreach ($solicitudes as $solicitud) {
            Solicitud::create($solicitud);
        }
    }
}
