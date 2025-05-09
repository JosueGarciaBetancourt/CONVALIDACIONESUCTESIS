<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Silabo;


class SilaboSeeder extends Seeder
{
    public function run(): void
    {
        $silabos = [
            [
                'idSilabo' => 1,
                'idCurso' => 1,
                'codigo' => 'ASUC00687',
                'anio' => 2015,
                'caracter' => 'Obligatorio',
                'creditos' => 3,
                'horas_teoria' => 3,
                'horas_practica' => 2,
                'horas_teoricoPracticas' => 5,
                'sumilla' => 'Este curso introduce los fundamentos de la programación estructurada, haciendo uso del lenguaje C para resolver problemas básicos de lógica computacional.',
                'aprendizaje_general' => 'El estudiante será capaz de aplicar conceptos básicos de programación para el desarrollo de algoritmos que resuelvan problemas sencillos utilizando estructuras de control.',
            ],
            [
                'idSilabo' => 2,
                'idCurso' => 2,
                'codigo' => 'ASUC00469',
                'caracter' => 'Obligatorio',
                'anio' => 2018,
                'creditos' => 4,
                'horas_teoria' => 3,
                'horas_practica' => 3,
                'horas_teoricoPracticas' => 6,
                'sumilla' => 'El curso brinda los conceptos y herramientas fundamentales para el desarrollo de aplicaciones web dinámicas, utilizando tecnologías del lado cliente y servidor.',
                'aprendizaje_general' => 'El estudiante será capaz de diseñar e implementar sitios web dinámicos aplicando tecnologías modernas y buenas prácticas de desarrollo web.',
            ],
            [
                'idSilabo' => 3,
                'idCurso' => 3,
                'codigo' => 'F00050134',
                'anio' => 2024,
                'caracter' => 'Obligatorio',
                'creditos' => 3,
                'horas_teoria' => 2,
                'horas_practica' => 4,
                'horas_teoricoPracticas' => 6,
                'sumilla' => 'Curso que aborda el diseño, configuración y administración de redes de computadoras, cubriendo modelos de referencia como OSI y TCP/IP.',
                'aprendizaje_general' => 'El estudiante será capaz de identificar, implementar y gestionar componentes de una red de computadoras en diversos entornos.',
            ],
            [
                'idSilabo' => 4,
                'idCurso' => 4,
                'codigo' => '100000Z106',
                'anio' => 2016,
                'creditos' => 3,
                'horas_teoria' => 3,
                'horas_practica' => 2,
                'horas_teoricoPracticas' => 5,
                'sumilla' => 'Se introduce al estudiante en los conceptos básicos de programación, centrándose en el desarrollo de habilidades de lógica computacional y resolución de problemas.',
                'aprendizaje_general' => 'El estudiante desarrollará algoritmos y los implementará en un lenguaje de programación para resolver problemas básicos.',
            ],
            [
                'idSilabo' => 5,
                'idCurso' => 5,
                'codigo' => '100000Z107',
                'anio' => 2019,
                'creditos' => 4,
                'horas_teoria' => 3,
                'horas_practica' => 3,
                'horas_teoricoPracticas' => 6,
                'sumilla' => 'Curso orientado al desarrollo de aplicaciones web, abarcando HTML, CSS, JavaScript y frameworks modernos para el desarrollo del lado cliente y servidor.',
                'aprendizaje_general' => 'El estudiante será capaz de diseñar e implementar sitios web modernos, interactivos y funcionales.',
            ],
            [
                'idSilabo' => 6,
                'idCurso' => 6,
                'codigo' => '100000Z108',
                'anio' => 2023,
                'creditos' => 3,
                'horas_teoria' => 2,
                'horas_practica' => 4,
                'horas_teoricoPracticas' => 6,
                'sumilla' => 'Estudio de redes de computadoras desde una perspectiva práctica. Se enfatiza el cableado, configuración de routers y switches, y protocolos de comunicación.',
                'aprendizaje_general' => 'El estudiante podrá instalar, configurar y administrar redes de pequeña y mediana escala usando protocolos estándar.',
            ],
            [
                'idSilabo' => 7,
                'idCurso' => 7,
                'codigo' => 'EGI14B',
                'anio' => 2017,
                'creditos' => 3,
                'horas_teoria' => 3,
                'horas_practica' => 2,
                'horas_teoricoPracticas' => 5,
                'sumilla' => 'Este curso se enfoca en la lógica de programación, desarrollando habilidades de resolución de problemas mediante estructuras de control y datos.',
                'aprendizaje_general' => 'El estudiante desarrollará algoritmos y programas básicos utilizando un lenguaje de programación estructurado.',
            ],
            [
                'idSilabo' => 8,
                'idCurso' => 8,
                'codigo' => 'EGI14C',
                'anio' => 2020,
                'creditos' => 4,
                'horas_teoria' => 3,
                'horas_practica' => 3,
                'horas_teoricoPracticas' => 6,
                'sumilla' => 'Curso que permite al estudiante desarrollar aplicaciones web completas utilizando tecnologías como HTML5, CSS3, JavaScript y PHP.',
                'aprendizaje_general' => 'El estudiante será capaz de diseñar, implementar y mantener sitios web dinámicos y seguros.',
            ],
            [
                'idSilabo' => 9,
                'idCurso' => 9,
                'codigo' => 'EGI14D',
                'anio' => 2024,
                'creditos' => 3,
                'horas_teoria' => 2,
                'horas_practica' => 4,
                'horas_teoricoPracticas' => 6,
                'sumilla' => 'Curso que introduce los fundamentos de redes, abordando topologías, direccionamiento IP, protocolos, y seguridad básica de red.',
                'aprendizaje_general' => 'El estudiante podrá identificar componentes de red y diseñar soluciones de conectividad en entornos controlados.',
            ],
            [
                'idSilabo' => 10,
                'idCurso' => 10,
                'codigo' => 'AAAEEE',
                'anio' => 2024,
                'creditos' => 5,
                'horas_teoria' => 3,
                'horas_practica' => 5,
                'horas_teoricoPracticas' => 8,
                'sumilla' => 'Sumilla de curso de prueba.',
                'aprendizaje_general' => 'Aprendizajes de curso de prueba.',
            ],
        ];

        foreach ($silabos as $silabo) {
            Silabo::create($silabo);
        }
    }
}
