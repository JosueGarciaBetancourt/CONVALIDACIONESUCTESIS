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
                'peso' => 1.00,
            ],
            [
                'idCurso' => 1,
                'idGrupoTematico' => 3,
                'peso' => 0.20,
            ],

            // Relaciones para Ingeniería web (UC Malla 2018)
            [
                'idCurso' => 2,
                'idGrupoTematico' => 11,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 2,
                'idGrupoTematico' => 3,
                'peso' => 0.20,
            ],

            // Relaciones para Redes de computadoras (UC Malla 2024)
            [
                'idCurso' => 3,
                'idGrupoTematico' => 4,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 3,
                'idGrupoTematico' => 7,
                'peso' => 0.20,
            ],

            // Relaciones para Introducción a la Programación (UTP Malla 2016)
            [
                'idCurso' => 4,
                'idGrupoTematico' => 1,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 4,
                'idGrupoTematico' => 3,
                'peso' => 0.20,
            ],

            // Relaciones para Desarrollo web (UTP Malla 2019)
            [
                'idCurso' => 5,
                'idGrupoTematico' => 11,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 5,
                'idGrupoTematico' => 3,
                'peso' => 0.20,
            ],

            // Relaciones para Redes de computadoras 1 (UTP Malla 2023)
            [
                'idCurso' => 6,
                'idGrupoTematico' => 4,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 6,
                'idGrupoTematico' => 7,
                'peso' => 0.20,
            ],

            // Relaciones para Introducción a la Programación (UNCP Malla 2017)
            [
                'idCurso' => 7,
                'idGrupoTematico' => 1,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 7,
                'idGrupoTematico' => 3,
                'peso' => 0.20,
            ],
            // Relaciones para Programación Web (UNCP Malla 2020)
            [
                'idCurso' => 8,
                'idGrupoTematico' => 11,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 8,
                'idGrupoTematico' => 3,
                'peso' => 0.20,
            ],
            // Relaciones para Redes de Computadoras (UNCP Malla 2024)
            [
                'idCurso' => 9,
                'idGrupoTematico' => 4,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 9,
                'idGrupoTematico' => 7,
                'peso' => 0.20,
            ],
            // Relaciones para Cursos de prueba (Malla de Prueba 2024)
            [
                'idCurso' => 10,
                'idGrupoTematico' => 1,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 10,
                'idGrupoTematico' => 2,
                'peso' => 0.20,
            ],
            [
                'idCurso' => 11,
                'idGrupoTematico' => 3,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 11,
                'idGrupoTematico' => 4,
                'peso' => 0.20,
            ],
            [
                'idCurso' => 12,
                'idGrupoTematico' => 5,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 12,
                'idGrupoTematico' => 6,
                'peso' => 0.20,
            ],
            // Relaciones para cursos de UC Malla 2024 (similar_text y Levenshtein)
            // Programación
            [
                'idCurso' => 15,
                'idGrupoTematico' => 1,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 15,
                'idGrupoTematico' => 3,
                'peso' => 0.20,
            ],
            // Web
            [
                'idCurso' => 16,
                'idGrupoTematico' => 11,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 16,
                'idGrupoTematico' => 3,
                'peso' => 0.20,
            ],
            // Redes
            [
                'idCurso' => 17,
                'idGrupoTematico' => 4,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 17,
                'idGrupoTematico' => 7,
                'peso' => 0.20,
            ],
            // Relaciones para cursos de UC Malla 2024 (NLP)
            // Programación
            [
                'idCurso' => 18,
                'idGrupoTematico' => 1,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 18,
                'idGrupoTematico' => 3,
                'peso' => 0.20,
            ],
            // Web
            [
                'idCurso' => 19,
                'idGrupoTematico' => 11,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 19,
                'idGrupoTematico' => 3,
                'peso' => 0.20,
            ],
            // Redes
            [
                'idCurso' => 20,
                'idGrupoTematico' => 4,
                'peso' => 1.00,
            ],
            [
                'idCurso' => 20,
                'idGrupoTematico' => 7,
                'peso' => 0.20,
            ],
        ];

        foreach ($cursosGruposTematicos as $relacion) {
            CursoGrupoTematico::create($relacion);
        }
    }
}
