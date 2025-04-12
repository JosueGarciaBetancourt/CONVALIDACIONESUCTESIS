<?php

namespace Database\Seeders;

use App\Models\Malla;
use Illuminate\Database\Seeder;


class MallaSeeder extends Seeder
{
    public function run(): void
    {
        $mallas = [
            // Mallas para la UC-ISI
            [   
                'idMalla' => 1,
                'idCarrera' => 1,
                'anio_inicio' => 2015,
                'semestre_inicio' => "2015-1",
                'semestre_fin' => "2017-2",
            ],
            [   
                'idMalla' => 2,
                'idCarrera' => 1,
                'anio_inicio' => 2018,
                'semestre_inicio' => "2018-1",
                'semestre_fin' => "2023-2",
            ],
            [   
                'idMalla' => 3,
                'idCarrera' => 1,
                'anio_inicio' => 2024,
                'semestre_inicio' => "2024-1",
                'semestre_fin' => null, // Aún no finaliza esta malla
            ],

            // Mallas para la UTP (Universidad Tecnológica del Perú)
            [   
                'idMalla' => 4,
                'idCarrera' => 2,
                'anio_inicio' => 2016,
                'semestre_inicio' => "2016-1",
                'semestre_fin' => "2018-2",
            ],
            [   
                'idMalla' => 5,
                'idCarrera' => 2, 
                'anio_inicio' => 2019,
                'semestre_inicio' => "2019-1",
                'semestre_fin' => "2022-2",
            ],
            [   
                'idMalla' => 6,
                'idCarrera' => 2, 
                'anio_inicio' => 2023,
                'semestre_inicio' => "2023-1",
                'semestre_fin' => null, // Aún no finaliza esta malla
            ],

            // Mallas para la UNCP (Universidad Nacional del Centro del Perú)
            [   
                'idMalla' => 7,
                'idCarrera' => 3,
                'anio_inicio' => 2017,
                'semestre_inicio' => "2017-1",
                'semestre_fin' => "2019-2",
            ],
            [   
                'idMalla' => 8,
                'idCarrera' => 3, 
                'anio_inicio' => 2020,
                'semestre_inicio' => "2020-1",
                'semestre_fin' => "2023-2",
            ],
            [   
                'idMalla' => 9,
                'idCarrera' => 3, 
                'anio_inicio' => 2024,
                'semestre_inicio' => "2024-1",
                'semestre_fin' => null, // Aún no finaliza esta malla
            ],
        ];

        foreach ($mallas as $malla) {
            Malla::create($malla);
        }
    }
}
