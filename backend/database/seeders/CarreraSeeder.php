<?php

namespace Database\Seeders;

use App\Models\Carrera;
use Illuminate\Database\Seeder;


class CarreraSeeder extends Seeder
{
    public function run(): void
    {
        $carreras = [
            [   
                'idCarrera' => 1,
                'nombre' => 'Ingeniería de Sistemas e Informática',
                'codigo' => 'UC-ISI', //código general (propio del sistema)
                'abreviatura' => 'ISI',
                'idUniversidad' => 1, // UC
            ],
            [
                'idCarrera' => 2,
                'nombre' => 'Ingeniería de Sistemas e Informática',
                'codigo' => 'UTP-ISI',
                'abreviatura' => 'ISI',
                'idUniversidad' => 2, // UTP
            ],
            [
                'idCarrera' => 3,
                'nombre' => 'Ingeniería de Sistemas',
                'codigo' => 'UNCP-IS',
                'abreviatura' => 'IS',
                'idUniversidad' => 3, // UNCP
            ],
            [
                'idCarrera' => 4,
                'nombre' => 'Ingeniería Mecatrónica',
                'codigo' => 'UC-IM',
                'abreviatura' => 'IS',
                'idUniversidad' => 1, // UNCP
            ],
            // Carrera de prueba
            [   
                'idCarrera' => 5,
                'nombre' => 'Carrera de prueba',
                'codigo' => 'UP-CP',
                'abreviatura' => 'CP',
                'idUniversidad' => 4,
            ]
        ];

        foreach ($carreras as $carrera) {
            Carrera::create($carrera);
        }
    }
}
