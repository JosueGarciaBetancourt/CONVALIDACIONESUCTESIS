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
                'idGrupoTematico' => 1, // Fundamentos de Programación
                'peso' => 0.80,
            ],
            [
                'idCurso' => 1,
                'idGrupoTematico' => 2, // Estructuras de Datos y Algoritmos
                'peso' => 0.20,
            ],
            
            // Relaciones para Ingeniería web (UC Malla 2018)
            [
                'idCurso' => 2,
                'idGrupoTematico' => 3, // Desarrollo Web
                'peso' => 0.70,
            ],
            [
                'idCurso' => 2,
                'idGrupoTematico' => 6, // Ingeniería de Software
                'peso' => 0.30,
            ],
            
            // Relaciones para Redes de computadoras (UC Malla 2024)
            [
                'idCurso' => 3,
                'idGrupoTematico' => 7, // Redes y Comunicaciones
                'peso' => 0.90,
            ],
            [
                'idCurso' => 3,
                'idGrupoTematico' => 8, // Seguridad Informática
                'peso' => 0.10,
            ],
            
            // Relaciones para Introducción a la Programación (UTP Malla 2016)
            [
                'idCurso' => 4,
                'idGrupoTematico' => 1, // Fundamentos de Programación
                'peso' => 1.00,
            ],
            
            // Relaciones para Desarrollo web (UTP Malla 2019)
            [
                'idCurso' => 5,
                'idGrupoTematico' => 3, // Desarrollo Web
                'peso' => 0.85,
            ],
            [
                'idCurso' => 5,
                'idGrupoTematico' => 4, // Base de Datos
                'peso' => 0.15,
            ],
            
            // Relaciones para Redes de computadoras 1 (UTP Malla 2023)
            [
                'idCurso' => 6,
                'idGrupoTematico' => 7, // Redes y Comunicaciones
                'peso' => 0.75,
            ],
            [
                'idCurso' => 6,
                'idGrupoTematico' => 9, // Sistemas Operativos
                'peso' => 0.25,
            ],
            
            // Relaciones para Introducción a la Programación (UNCP Malla 2017)
            [
                'idCurso' => 7,
                'idGrupoTematico' => 1, // Fundamentos de Programación
                'peso' => 0.90,
            ],
            [
                'idCurso' => 7,
                'idGrupoTematico' => 11, // Matemática para Computación
                'peso' => 0.10,
            ],
            
            // Relaciones para Programación Web (UNCP Malla 2020)
            [
                'idCurso' => 8,
                'idGrupoTematico' => 3, // Desarrollo Web
                'peso' => 0.60,
            ],
            [
                'idCurso' => 8,
                'idGrupoTematico' => 4, // Base de Datos
                'peso' => 0.25,
            ],
            [
                'idCurso' => 8,
                'idGrupoTematico' => 6, // Ingeniería de Software
                'peso' => 0.15,
            ],
            
            // Relaciones para Redes de Computadoras (UNCP Malla 2024)
            [
                'idCurso' => 9,
                'idGrupoTematico' => 7, // Redes y Comunicaciones
                'peso' => 0.80,
            ],
            [
                'idCurso' => 9,
                'idGrupoTematico' => 8, // Seguridad Informática
                'peso' => 0.20,
            ],
            
            // Cursos de prueba
            [
                'idCurso' => 10,
                'idGrupoTematico' => 5, // Inteligencia Artificial
                'peso' => 0.50,
            ],
            [
                'idCurso' => 10,
                'idGrupoTematico' => 10, // Ciencia de Datos
                'peso' => 0.50,
            ],
            [
                'idCurso' => 11,
                'idGrupoTematico' => 14, // Computación en la Nube
                'peso' => 0.65,
            ],
            [
                'idCurso' => 11,
                'idGrupoTematico' => 15, // Innovación y Transformación Digital
                'peso' => 0.35,
            ],
            [
                'idCurso' => 12,
                'idGrupoTematico' => 12, // Gestión de Proyectos TI
                'peso' => 0.40,
            ],
            [
                'idCurso' => 12,
                'idGrupoTematico' => 6, // Ingeniería de Software
                'peso' => 0.60,
            ],
        ];

        foreach ($cursosGruposTematicos as $cursoGrupoTematico) {
            CursoGrupoTematico::create($cursoGrupoTematico);
        }
    }
}