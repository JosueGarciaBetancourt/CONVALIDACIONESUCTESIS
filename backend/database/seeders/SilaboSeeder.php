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
                'idCurso' => 1,
                'anio' => 2015,
                'sumilla' => 'Este curso introduce los fundamentos de la programación estructurada, haciendo uso del lenguaje C para resolver problemas básicos de lógica computacional.',
                'aprendizaje_general' => 'El estudiante será capaz de aplicar conceptos básicos de programación para el desarrollo de algoritmos que resuelvan problemas sencillos utilizando estructuras de control.',
            ],
            [
                'idCurso' => 2,
                'anio' => 2018,
                'sumilla' => 'El curso brinda los conceptos y herramientas fundamentales para el desarrollo de aplicaciones web dinámicas, utilizando tecnologías del lado cliente y servidor.',
                'aprendizaje_general' => 'El estudiante será capaz de diseñar e implementar sitios web dinámicos aplicando tecnologías modernas y buenas prácticas de desarrollo web.',
            ],
            [
                'idCurso' => 3,
                'anio' => 2024,
                'sumilla' => 'Curso que aborda el diseño, configuración y administración de redes de computadoras, cubriendo modelos de referencia como OSI y TCP/IP.',
                'aprendizaje_general' => 'El estudiante será capaz de identificar, implementar y gestionar componentes de una red de computadoras en diversos entornos.',
            ],
            [
                'idCurso' => 4,
                'anio' => 2016,
                'sumilla' => 'Se introduce al estudiante en los conceptos básicos de programación, centrándose en el desarrollo de habilidades de lógica computacional y resolución de problemas.',
                'aprendizaje_general' => 'El estudiante desarrollará algoritmos y los implementará en un lenguaje de programación para resolver problemas básicos.',
            ],
            [
                'idCurso' => 5,
                'anio' => 2019,
                'sumilla' => 'Curso orientado al desarrollo de aplicaciones web, abarcando HTML, CSS, JavaScript y frameworks modernos para el desarrollo del lado cliente y servidor.',
                'aprendizaje_general' => 'El estudiante será capaz de diseñar e implementar sitios web modernos, interactivos y funcionales.',
            ],
            [
                'idCurso' => 6,
                'anio' => 2023,
                'sumilla' => 'Estudio de redes de computadoras desde una perspectiva práctica. Se enfatiza el cableado, configuración de routers y switches, y protocolos de comunicación.',
                'aprendizaje_general' => 'El estudiante podrá instalar, configurar y administrar redes de pequeña y mediana escala usando protocolos estándar.',
            ],
            [
                'idCurso' => 7,
                'anio' => 2017,
                'sumilla' => 'Este curso se enfoca en la lógica de programación, desarrollando habilidades de resolución de problemas mediante estructuras de control y datos.',
                'aprendizaje_general' => 'El estudiante desarrollará algoritmos y programas básicos utilizando un lenguaje de programación estructurado.',
            ],
            [
                'idCurso' => 8,
                'anio' => 2020,
                'sumilla' => 'Curso que permite al estudiante desarrollar aplicaciones web completas utilizando tecnologías como HTML5, CSS3, JavaScript y PHP.',
                'aprendizaje_general' => 'El estudiante será capaz de diseñar, implementar y mantener sitios web dinámicos y seguros.',
            ],
            [
                'idCurso' => 9,
                'anio' => 2024,
                'sumilla' => 'Curso que introduce los fundamentos de redes, abordando topologías, direccionamiento IP, protocolos, y seguridad básica de red.',
                'aprendizaje_general' => 'El estudiante podrá identificar componentes de red y diseñar soluciones de conectividad en entornos controlados.',
            ],
        ];

        foreach ($silabos as $silabo) {
            Silabo::create($silabo);
        }
    }
}
