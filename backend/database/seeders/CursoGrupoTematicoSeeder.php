<?php

namespace Database\Seeders;

use App\Models\CursoGrupoTematico;
use Illuminate\Database\Seeder;

class CursoGrupoTematicoSeeder extends Seeder
{
    public function run(): void
    {
        $cursosGruposTematicos = [
            // Relaciones para Programación I (UC Malla 2015)
            [
                'idCurso' => 1,
                'idGrupoTematico' => 1,
                'peso' => 0.80,
            ],
            [
                'idCurso' => 1,
                'idGrupoTematico' => 2,
                'peso' => 0.20,
            ],

            // Relaciones para Ingeniería web (UC Malla 2018)
            [
                'idCurso' => 2,
                'idGrupoTematico' => 3,
                'peso' => 0.70,
            ],
            [
                'idCurso' => 2,
                'idGrupoTematico' => 6,
                'peso' => 0.30,
            ],

            // Relaciones para Redes de computadoras (UC Malla 2024)
            [
                'idCurso' => 3,
                'idGrupoTematico' => 7,
                'peso' => 0.90,
            ],
            [
                'idCurso' => 3,
                'idGrupoTematico' => 8,
                'peso' => 0.10,
            ],

            // Relaciones para Introducción a la Programación (UTP Malla 2016)
            [
                'idCurso' => 4,
                'idGrupoTematico' => 1,
                'peso' => 1.00,
            ],

            // Relaciones para Desarrollo web (UTP Malla 2019)
            [
                'idCurso' => 5,
                'idGrupoTematico' => 3,
                'peso' => 0.85,
            ],
            [
                'idCurso' => 5,
                'idGrupoTematico' => 4,
                'peso' => 0.15,
            ],

            // Relaciones para Redes de computadoras 1 (UTP Malla 2023)
            [
                'idCurso' => 6,
                'idGrupoTematico' => 7,
                'peso' => 0.75,
            ],
            [
                'idCurso' => 6,
                'idGrupoTematico' => 9,
                'peso' => 0.25,
            ],

            // Relaciones para Introducción a la Programación (UNCP Malla 2017)
            [
                'idCurso' => 7,
                'idGrupoTematico' => 1,
                'peso' => 0.90,
            ],
            [
                'idCurso' => 7,
                'idGrupoTematico' => 11,
                'peso' => 0.10,
            ],

            // Relaciones para Programación Web (UNCP Malla 2020)
            [
                'idCurso' => 8,
                'idGrupoTematico' => 3,
                'peso' => 0.60,
            ],
            [
                'idCurso' => 8,
                'idGrupoTematico' => 4,
                'peso' => 0.25,
            ],
            [
                'idCurso' => 8,
                'idGrupoTematico' => 6,
                'peso' => 0.15,
            ],
        ];

        foreach ($cursosGruposTematicos as $relacion) {
            CursoGrupoTematico::create($relacion);
        }
    }
}
