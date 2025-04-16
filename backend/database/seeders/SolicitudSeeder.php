<?php

namespace Database\Seeders;

use App\Models\Solicitud;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SolicitudSeeder extends Seeder
{
    public function run(): void
    {
        $solicitudes = [
            [   
                'idSolicitud' => 1,
                'codigo' => 'SOLI-001',
                'idEstudiante' => 2,
                'idCarreraDestino' => 1,
                'idUsuarioEvaluador' => 1,
            ],
            [   
                'idSolicitud' => 2,
                'codigo' => 'SOLI-002',
                'idEstudiante' => 3,
                'idCarreraDestino' => 1,
                'idUsuarioEvaluador' => 2,
            ],  
        ];

        foreach ($solicitudes as $solicitud) {
            Solicitud::create($solicitud);
        }
    }
}
