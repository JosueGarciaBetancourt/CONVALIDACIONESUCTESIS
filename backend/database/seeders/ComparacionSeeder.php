<?php

namespace Database\Seeders;

use App\Models\Comparacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComparacionSeeder extends Seeder
{
    public function run(): void
    {
        $comparaciones = [
            [   
                'idComparacion' => 1,
                'idSolicitud' => 1,
                'idCursoOrigen' => 6,
                'idCursoDestino' => 3,
                'porcentaje_similitud' => 0.72,
                'resultado' => 0, // 1 (aprobado) ó 0 (rechazado)
                'justificacion' => 'El porcentaje de similitud no supera el 75% para aprobar la convalidación de este curso',
            ],
            [   
                'idComparacion' => 2,
                'idSolicitud' => 2,
                'idCursoOrigen' => 8,
                'idCursoDestino' => 2,
                'porcentaje_similitud' => 0.78,
                'resultado' => 1, // 1 (aprobado) ó 0 (rechazado)
                'justificacion' => 'El porcentaje de similitud supera el 75% para aprobar la convalidación de este curso',
            ],
        ];

        foreach ($comparaciones as $comparacion) {
            Comparacion::create($comparacion);
        }
    }
}
