<?php

namespace Database\Seeders;

use App\Models\GrupoTematico;
use Illuminate\Database\Seeder;

class GrupoTematicoSeeder extends Seeder
{
    public function run(): void
    {
        $gruposTematicos = [
            [
                'idGrupoTematico' => 1, 
                'nombre' => 'Fundamentos de Programación', 
                'descripcion' => 'Conceptos básicos de algoritmos, estructuras de control y lógica computacional.'
            ],
            [
                'idGrupoTematico' => 2,
                'nombre' => 'Estructuras de Datos y Algoritmos', 
                'descripcion' => 'Organización, almacenamiento y procesamiento eficiente de datos.'
            ],
            [
                'idGrupoTematico' => 3, 
                'nombre' => 'Desarrollo Web', 
                'descripcion' => 'Creación de aplicaciones web del lado cliente y servidor.'
            ],
            [
                'idGrupoTematico' => 4, 
                'nombre' => 'Base de Datos', 
                'descripcion' => 'Modelado, diseño e implementación de bases de datos relacionales y no relacionales.'
            ],
            [
                'idGrupoTematico' => 5, 
                'nombre' => 'Inteligencia Artificial', 
                'descripcion' => 'Técnicas y algoritmos de IA como machine learning, NLP y visión artificial.'
            ],
            [
                'idGrupoTematico' => 6, 
                'nombre' => 'Ingeniería de Software', 
                'descripcion' => 'Metodologías y técnicas para el diseño, desarrollo y mantenimiento de software.'
            ],
            [
                'idGrupoTematico' => 7, 
                'nombre' => 'Redes y Comunicaciones', 
                'descripcion' => 'Fundamentos de redes de computadoras, protocolos y seguridad en la transmisión de datos.'
            ],
            [
                'idGrupoTematico' => 8, 
                'nombre' => 'Seguridad Informática', 
                'descripcion' => 'Protección de sistemas, redes y datos frente a ataques y vulnerabilidades.'
            ],
            [
                'idGrupoTematico' => 9, 
                'nombre' => 'Sistemas Operativos', 
                'descripcion' => 'Administración de recursos de hardware y software en computadoras y servidores.'
            ],
            [
                'idGrupoTematico' => 10, 
                'nombre' => 'Ciencia de Datos', 
                'descripcion' => 'Técnicas de análisis, procesamiento y visualización de grandes volúmenes de datos.'
            ],
            [
                'idGrupoTematico' => 11, 
                'nombre' => 'Matemática para Computación', 
                'descripcion' => 'Matemática discreta, álgebra lineal y cálculo aplicados a informática.'
            ],
            [
                'idGrupoTematico' => 12, 
                'nombre' => 'Gestión de Proyectos TI', 
                'descripcion' => 'Administración y control de proyectos de tecnología de la información.'
            ],
            [
                'idGrupoTematico' => 13, 
                'nombre' => 'Arquitectura de Computadoras', 
                'descripcion' => 'Estructura interna y funcionamiento de computadoras y microprocesadores.'
            ],
            [
                'idGrupoTematico' => 14, 
                'nombre' => 'Computación en la Nube', 
                'descripcion' => 'Servicios y aplicaciones distribuidas mediante plataformas en la nube.'
            ],
            [
                'idGrupoTematico' => 15, 
                'nombre' => 'Innovación y Transformación Digital', 
                'descripcion' => 'Tendencias tecnológicas y adopción digital en empresas y organizaciones.'
            ],
        ];

        foreach ($gruposTematicos as $grupoTematico) {
            GrupoTematico::create($grupoTematico);
        }
    }
}
