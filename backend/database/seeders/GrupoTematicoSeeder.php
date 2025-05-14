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
                'nombre' => 'Programación y Desarrollo de Software',
                'descripcion' => 'Incluye temas de lógica de programación, paradigmas de desarrollo, estructuras de datos y patrones de diseño de software.'
            ],
            [
                'idGrupoTematico' => 2,
                'nombre' => 'Bases de Datos y Gestión de la Información',
                'descripcion' => 'Abarca modelado de datos, diseño de bases de datos relacionales y no relacionales, y sistemas de gestión de bases de datos.'
            ],
            [
                'idGrupoTematico' => 3,
                'nombre' => 'Ingeniería de Software',
                'descripcion' => 'Metodologías, gestión de proyectos de software, aseguramiento de calidad y ciclo de vida del desarrollo de aplicaciones.'
            ],
            [
                'idGrupoTematico' => 4,
                'nombre' => 'Redes, Comunicaciones y Seguridad',
                'descripcion' => 'Comprende fundamentos de redes, protocolos de comunicación, arquitecturas de red y seguridad informática.'
            ],
            [
                'idGrupoTematico' => 5,
                'nombre' => 'Sistemas Operativos y Plataformas Tecnológicas',
                'descripcion' => 'Estudia el funcionamiento de sistemas operativos, administración de recursos y servicios de plataforma.'
            ],
            [
                'idGrupoTematico' => 6,
                'nombre' => 'Ciencia de Datos e Inteligencia Artificial',
                'descripcion' => 'Incluye análisis de datos, minería de datos, machine learning, procesamiento de lenguaje natural y visión computacional.'
            ],
            [
                'idGrupoTematico' => 7,
                'nombre' => 'Computación en la Nube y Tecnologías Emergentes',
                'descripcion' => 'Abarca arquitecturas cloud, virtualización, servicios distribuidos y tendencias tecnológicas actuales.'
            ],
            [
                'idGrupoTematico' => 8,
                'nombre' => 'Arquitectura de Computadoras y Hardware',
                'descripcion' => 'Se enfoca en la estructura interna de los computadores, microprocesadores y componentes de hardware.'
            ],
            [
                'idGrupoTematico' => 9,
                'nombre' => 'Matemática y Estadística Aplicada',
                'descripcion' => 'Temas de matemática discreta, álgebra, estadística y cálculo enfocados a aplicaciones en sistemas de información.'
            ],
            [
                'idGrupoTematico' => 10,
                'nombre' => 'Gestión de Tecnologías de Información',
                'descripcion' => 'Comprende dirección de proyectos TI, innovación digital, transformación organizacional y gobierno de TI.'
            ],
            [
                'idGrupoTematico' => 11,
                'nombre' => 'Desarrollo Web y Aplicaciones Móviles',
                'descripcion' => 'Incluye diseño y desarrollo de aplicaciones web y móviles, frameworks modernos y arquitecturas cliente-servidor.'
            ],
            [
                'idGrupoTematico' => 12,
                'nombre' => 'Investigación, Ética y Responsabilidad Social',
                'descripcion' => 'Aborda metodología de investigación, ética profesional y aportes de la tecnología a la sociedad.'
            ],
            [
                'idGrupoTematico' => 13,
                'nombre' => 'Tecnologías de Integración y Middleware',
                'descripcion' => 'Estudia herramientas, protocolos y técnicas para la integración de sistemas y aplicaciones empresariales.'
            ],
            [
                'idGrupoTematico' => 14,
                'nombre' => 'Simulación, Modelado y Optimización de Sistemas',
                'descripcion' => 'Incluye simulación de procesos, modelado de sistemas complejos y optimización computacional.'
            ],
            [
                'idGrupoTematico' => 15,
                'nombre' => 'GRUPO TEMÁTICO DE PRUEBA',
                'descripcion' => 'DESCRIPCIÓN DE GRUPO TEMÁTICO DE PRUEBA.'
            ],
        ];

        foreach ($gruposTematicos as $grupoTematico) {
            GrupoTematico::create($grupoTematico);
        }
    }
}
