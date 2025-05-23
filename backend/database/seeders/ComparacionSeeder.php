<?php

namespace Database\Seeders;

use App\Models\Comparacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComparacionSeeder extends Seeder
{
    public function run(): void
    {
        // Las comparaciones se crearán automáticamente después de recibir la respuesta del API de PLN
        // por ahora solo son datos ficticios 
        
        $comparaciones = [
            [   
                'idComparacion' => 1,
                'idSolicitud' => 1,
                'idCursoOrigen' => 6,
                'idCursoDestino' => 3,
                'porcentaje_similitud' => 0.72,
                'resultado' => 0, // 1 (aprobado) ó 0 (rechazado)
                'justificacion' => 'El porcentaje de similitud no supera el 75% para aprobar la convalidación de este curso',
                'requirio_revision_manual' => false,
            ],
            [   
                'idComparacion' => 2,
                'idSolicitud' => 2,
                'idCursoOrigen' => 8,
                'idCursoDestino' => 2,
                'porcentaje_similitud' => 0.78,
                'resultado' => 1, // 1 (aprobado) ó 0 (rechazado)
                'justificacion' => 'El porcentaje de similitud supera el 75% para aprobar la convalidación de este curso',
                'requirio_revision_manual' => false,
            ],
            [   
                'idComparacion' => 3,
                'idSolicitud' => 3,
                'idCursoOrigen' => 7,
                'idCursoDestino' => 1,
                'porcentaje_similitud' => 0.78,
                'resultado' => 1, // 1 (aprobado) ó 0 (rechazado)
                'justificacion' => 'El porcentaje de similitud supera el 75% para aprobar la convalidación de este curso',
                'requirio_revision_manual' => false,
            ],
            
            // Comparación de prueba
            [   
                'idComparacion' => 4,
                'idSolicitud' => 4,
                'idCursoOrigen' => 10,
                'idCursoDestino' => 9,
                'porcentaje_similitud' => 0.30,
                'resultado' => 1, // 1 (aprobado) ó 0 (rechazado)
                'justificacion' => 'El porcentaje de similitud no supera el 75% para aprobar la convalidación de este curso',
                'requirio_revision_manual' => true,
            ],
        ];

        foreach ($comparaciones as $comparacion) {
            Comparacion::create($comparacion);
        }
    }
}
