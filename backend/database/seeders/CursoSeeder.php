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
                Abreviatura_Universidad-Abreviatura_Carrera-CodigoSilabo-AnioSilabo-Elecivo/Obligatorio
            → Cursos foráneos:
                Abreviatura_Universidad-Abreviatura_Carrera-CodigoSilabo-AnioSilabo
        */
        
        $cursos = [
            // CURSOS PARA LA UC
            // Malla 2015
            [   
                'idCurso' => 1,
                'idMalla' => 1, // Malla 2015 UC
                'codigo' => 'UTP-ISI-ASUC00687-2015',
                'nombre' => 'Programación I',
                'anio' => 2015,
                'creditos' => 3,
                'horas_teoria' => 3,
                'horas_practica' => 2,
                'horas_teoricoPracticas' => 5,
                'fueComparado' => false,
            ],
            // Malla 2018
            [   
                'idCurso' => 2,
                'idMalla' => 2, // Malla 2018 UC
                'codigo' => 'UTP-ISI-ASUC00469-2018',
                'nombre' => 'Ingeniería web',
                'anio' => 2018,
                'creditos' => 4,
                'horas_teoria' => 3,
                'horas_practica' => 3,
                'horas_teoricoPracticas' => 6,
                'fueComparado' => false,
            ],
            // Malla 2024
            [   
                'idCurso' => 3,
                'idMalla' => 3, // Malla 2024 UC
                'codigo' => 'UTP-ISI-F00050134-2024',
                'nombre' => 'Redes de computadoras',
                'anio' => 2024,
                'creditos' => 3,
                'horas_teoria' => 2,
                'horas_practica' => 4,
                'horas_teoricoPracticas' => 6,
                'fueComparado' => false,
            ],

            // CURSOS PARA LA UTP
            // Malla 2016
            [   
                'idCurso' => 4,
                'idMalla' => 4, // Malla 2016 UTP
                'codigo' => 'UTP-ISI-100000Z106-2016',
                'nombre' => 'Introducción a la Programación',
                'anio' => 2016,
                'creditos' => 3,
                'horas_teoria' => 3,
                'horas_practica' => 2,
                'horas_teoricoPracticas' => 5,
                'fueComparado' => false,
            ],
            // Malla 2019
            [   
                'idCurso' => 5,
                'idMalla' => 5, // Malla 2019 UTP
                'codigo' => 'UTP-ISI-100000Z107-2019',
                'nombre' => 'Desarrollo web',
                'anio' => 2019,
                'creditos' => 4,
                'horas_teoria' => 3,
                'horas_practica' => 3,
                'horas_teoricoPracticas' => 6,
                'fueComparado' => false,
            ],
            // Malla 2023
            [   
                'idCurso' => 6,
                'idMalla' => 6, // Malla 2023 UTP
                'codigo' => 'UTP-ISI-100000Z108-2023',
                'nombre' => 'Redes de computadoras 1',
                'anio' => 2023,
                'creditos' => 3,
                'horas_teoria' => 2,
                'horas_practica' => 4,
                'horas_teoricoPracticas' => 6,
                'fueComparado' => false,
            ],

            // CURSOS PARA LA UNCP
            // Malla 2017
            [   
                'idCurso' => 7,
                'idMalla' => 7, // Malla 2017 UNCP
                'codigo' => 'UNCP-ISI-EGI14B-2017',
                'nombre' => 'Introducción a la Programación',
                'anio' => 2017,
                'creditos' => 3,
                'horas_teoria' => 3,
                'horas_practica' => 2,
                'horas_teoricoPracticas' => 5,
                'fueComparado' => false,
            ],
            // Malla 2020
            [   
                'idCurso' => 8,
                'idMalla' => 8, // Malla 2020 UNCP
                'codigo' => 'UNCP-ISI-EGI14C-2020-OBLI',
                'nombre' => 'Programación Web',
                'anio' => 2020,
                'creditos' => 4,
                'horas_teoria' => 3,
                'horas_practica' => 3,
                'horas_teoricoPracticas' => 6,
                'fueComparado' => false,
            ],
            // Malla 2024
            [   
                'idCurso' => 9,
                'idMalla' => 9, // Malla 2024 UNCP
                'codigo' => 'UNCP-ISI-EGI14D-2024-ELEC',
                'nombre' => 'Redes de Computadoras',
                'anio' => 2024,
                'creditos' => 3,
                'horas_teoria' => 2,
                'horas_practica' => 4,
                'horas_teoricoPracticas' => 6,
                'fueComparado' => false,
            ]
        ];

        foreach ($cursos as $curso) {
            Curso::create($curso);
        }
    }
}