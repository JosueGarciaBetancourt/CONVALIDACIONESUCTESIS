<?php

namespace Database\Seeders;

use App\Models\Curso;
use Illuminate\Database\Seeder;


class CursoSeeder extends Seeder
{
    public function run(): void
    {
        /* Para estandarizar el código de un curso se usará la siguiente estructura:
            → Cursos locales:
                Abreviatura_Universidad-Abreviatura_Carrera-CodigoSilabo-AnioSilabo-Electivo/Obligatorio
            → Cursos foráneos:
                Abreviatura_Universidad-Abreviatura_Carrera-CodigoSilabo-AnioSilabo
        */
        
        $cursos = [
            // CURSOS PARA LA UC
            // Malla 2015
            [   
                'idCurso' => 1,
                'idMalla' => 1, // Malla 2015 UC
                'codigo' => 'UC-ISI-ASUC00687-2015',
                'nombre' => 'Programación I',
                'fueComparado' => false,
            ],
            // Malla 2018
            [   
                'idCurso' => 2,
                'idMalla' => 2, // Malla 2018 UC
                'codigo' => 'UC-ISI-ASUC00469-2018',
                'nombre' => 'Ingeniería web',
                'fueComparado' => false,
            ],
            // Malla 2024
            [   
                'idCurso' => 3,
                'idMalla' => 3, // Malla 2024 UC
                'codigo' => 'UC-ISI-F00050134-2024',
                'nombre' => 'Redes de computadoras',
                'fueComparado' => false,
            ],
            // CURSOS PARA LA UTP
            // Malla 2016
            [   
                'idCurso' => 4,
                'idMalla' => 4, // Malla 2016 UTP
                'codigo' => 'UTP-ISI-100000Z106-2016',
                'nombre' => 'Introducción a la Programación',
                'fueComparado' => false,
            ],
            // Malla 2019
            [   
                'idCurso' => 5,
                'idMalla' => 5, // Malla 2019 UTP
                'codigo' => 'UTP-ISI-100000Z107-2019',
                'nombre' => 'Desarrollo web',
                'fueComparado' => false,
            ],
            // Malla 2023
            [   
                'idCurso' => 6,
                'idMalla' => 6, // Malla 2023 UTP
                'codigo' => 'UTP-ISI-100000Z108-2023',
                'nombre' => 'Redes de computadoras 1',
                'fueComparado' => false,
            ],

            // CURSOS PARA LA UNCP
            // Malla 2017
            [   
                'idCurso' => 7,
                'idMalla' => 7, // Malla 2017 UNCP
                'codigo' => 'UNCP-ISI-EGI14B-2017',
                'nombre' => 'Introducción a la Programación',
                'fueComparado' => false,
            ],
            // Malla 2020
            [   
                'idCurso' => 8,
                'idMalla' => 8, // Malla 2020 UNCP
                'codigo' => 'UNCP-ISI-EGI14C-2020-OBLI',
                'nombre' => 'Programación Web',
                'fueComparado' => false,
            ],
            // Malla 2024
            [   
                'idCurso' => 9,
                'idMalla' => 9, // Malla 2024 UNCP
                'codigo' => 'UNCP-ISI-EGI14D-2024-ELEC',
                'nombre' => 'Redes de Computadoras',
                'fueComparado' => false,
            ],
            // Cursos de prueba
            [   
                'idCurso' => 10,
                'idMalla' =>  9, // Malla de Prueba 2024
                'codigo' => 'UC-ISI-AAAEEE-2024',
                'nombre' => 'Curso de prueba',
                'fueComparado' => true,
            ],
            [   
                'idCurso' => 11,
                'idMalla' =>  9, // Malla de Prueba 2024
                'codigo' => 'UC-ISI-TEST01-2024',
                'nombre' => 'Curso de prueba 2',
                'fueComparado' => true,
            ],
            [   
                'idCurso' => 12,
                'idMalla' =>  1, // Malla 2015 UC
                'codigo' => 'UC-ISI-TEST02-2024',
                'nombre' => 'Curso de prueba Malla 2015 UC',
                'fueComparado' => false,
            ],
            // UC
            [   
                'idCurso' => 13,
                'idMalla' => 3, // Malla 2024 UC
                'codigo' => 'UC-ISI-F00050135-2024',
                'nombre' => 'Fundamentos de la programación',
                'fueComparado' => false,
            ],
            [   
                'idCurso' => 14,
                'idMalla' => 3, // Malla 2024 UC
                'codigo' => 'UC-ISI-F00050136-2024',
                'nombre' => 'Diseño y Desarrollo Web',
                'fueComparado' => false,
            ],
            // UC cursos parecidos (similar_text y Levenshtein)
            [   
                'idCurso' => 15,
                'idMalla' => 3, // Malla 2024 UC
                'codigo' => 'UC-ISI-F00050137-2024',
                'nombre' => 'Técnicas de programación',
                'fueComparado' => false,
            ],
            [   
                'idCurso' => 16,
                'idMalla' => 3, // Malla 2024 UC
                'codigo' => 'UC-ISI-F00050138-2024',
                'nombre' => 'Aplicaciones Web',
                'fueComparado' => false,
            ],
            [   
                'idCurso' => 17,
                'idMalla' => 3, // Malla 2024 UC
                'codigo' => 'UC-ISI-F00050139-2024',
                'nombre' => 'Redes y Comunicaciones',
                'fueComparado' => false,
            ],
            // UC cursos "parecidos" (NLP)
            [   
                'idCurso' => 18,
                'idMalla' => 3, // Malla 2024 UC
                'codigo' => 'UC-ISI-F00050140-2024',
                'nombre' => 'Fundamentos de Algoritmos',
                'fueComparado' => false,
            ],
            [   
                'idCurso' => 19,
                'idMalla' => 3, // Malla 2024 UC
                'codigo' => 'UC-ISI-F00050141-2024',
                'nombre' => 'Desarrollo de Aplicaciones para Internet',
                'fueComparado' => false,
            ],
            [   
                'idCurso' => 20,
                'idMalla' => 3, // Malla 2024 UC
                'codigo' => 'UC-ISI-F00050142-2024',
                'nombre' => 'Principios de Conectividad',
                'fueComparado' => false,
            ],
        ];

        foreach ($cursos as $curso) {
            Curso::create($curso);
        }
    }
}