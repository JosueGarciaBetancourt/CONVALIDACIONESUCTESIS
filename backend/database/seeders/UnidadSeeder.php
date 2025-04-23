<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Unidad;


class UnidadSeeder extends Seeder
{
    public function run(): void
    {
        $unidades = [
            // Silabo 1 (Programación I - 2015)
            [
                'idSilabo' => 1,
                'numero' => 1,
                'titulo' => 'Fundamentos de programación estructurada',
                'duracion_semanas' => '1-4',
                'aprendizajes' => 'Comprender los principios básicos de la programación estructurada.',
                'temas' => 'Algoritmos, diagramas de flujo, pseudocódigo.',
            ],
            [
                'idSilabo' => 1,
                'numero' => 2,
                'titulo' => 'Introducción al lenguaje C',
                'duracion_semanas' => '5-8',
                'aprendizajes' => 'Escribir programas básicos en lenguaje C.',
                'temas' => 'Sintaxis básica, entrada/salida, operadores.',
            ],
            [
                'idSilabo' => 1,
                'numero' => 3,
                'titulo' => 'Control de flujo',
                'duracion_semanas' => '9-12',
                'aprendizajes' => 'Aplicar estructuras condicionales y repetitivas.',
                'temas' => 'if, else, switch, while, for, do-while.',
            ],
            [
                'idSilabo' => 1,
                'numero' => 4,
                'titulo' => 'Funciones y modularidad',
                'duracion_semanas' => '13-16',
                'aprendizajes' => 'Implementar funciones para modularizar el código.',
                'temas' => 'Funciones, parámetros, ámbito de variables.',
            ],

            // Silabo 2 (Ingeniería Web - 2018)
            [
                'idSilabo' => 2,
                'numero' => 1,
                'titulo' => 'Fundamentos de desarrollo web',
                'duracion_semanas' => '1-4',
                'aprendizajes' => 'Comprender la arquitectura y componentes de aplicaciones web.',
                'temas' => 'HTML5, CSS3, arquitectura cliente-servidor, HTTP.',
            ],
            [
                'idSilabo' => 2, 
                'numero' => 2,
                'titulo' => 'JavaScript y programación del lado cliente',
                'duracion_semanas' => '5-8',
                'aprendizajes' => 'Implementar interactividad en páginas web mediante JavaScript.',
                'temas' => 'Sintaxis JavaScript, DOM, eventos, AJAX.',
            ],
            [
                'idSilabo' => 2,
                'numero' => 3,
                'titulo' => 'Gestión de formularios web',
                'duracion_semanas' => '9-12',
                'aprendizajes' => 'Procesar formularios y validar entradas.',
                'temas' => 'Formularios HTML, validación, métodos GET y POST.',
            ],
            [
                'idSilabo' => 2,
                'numero' => 4,
                'titulo' => 'Integración con bases de datos',
                'duracion_semanas' => '13-16',
                'aprendizajes' => 'Conectar aplicaciones web a bases de datos.',
                'temas' => 'PHP y MySQL, sentencias SQL básicas.',
            ],

            // Silabo 3 (Redes - 2024)
            [
                'idSilabo' => 3,
                'numero' => 1,
                'titulo' => 'Fundamentos de redes de computadoras',
                'duracion_semanas' => '1-4',
                'aprendizajes' => 'Comprender los conceptos básicos de las redes de computadoras.',
                'temas' => 'Modelos OSI y TCP/IP, topologías, medios de transmisión.',
            ],
            [
                'idSilabo' => 3,
                'numero' => 2,
                'titulo' => 'Direccionamiento IP',
                'duracion_semanas' => '5-8',
                'aprendizajes' => 'Diseñar esquemas de direccionamiento IP para redes locales.',
                'temas' => 'IPv4, IPv6, subnetting, VLSM.',
            ],
            [
                'idSilabo' => 3,
                'numero' => 3,
                'titulo' => 'Protocolos de red',
                'duracion_semanas' => '9-12',
                'aprendizajes' => 'Comprender el funcionamiento de protocolos clave.',
                'temas' => 'TCP, UDP, HTTP, FTP, DNS.',
            ],
            [
                'idSilabo' => 3,
                'numero' => 4,
                'titulo' => 'Seguridad en redes',
                'duracion_semanas' => '13-16',
                'aprendizajes' => 'Implementar mecanismos básicos de seguridad en redes.',
                'temas' => 'Firewalls, VPNs, criptografía, detección de intrusiones.',
            ],

            // Silabo 4 (Programación I - 2016)
            [
                'idSilabo' => 4,
                'numero' => 1,
                'titulo' => 'Introducción a la programación',
                'duracion_semanas' => '1-4',
                'aprendizajes' => 'Comprender los fundamentos de algoritmos y lógica de programación.',
                'temas' => 'Pensamiento computacional, algoritmos, diagramas de flujo.',
            ],
            [
                'idSilabo' => 4,
                'numero' => 2,
                'titulo' => 'Estructuras de control',
                'duracion_semanas' => '5-8',
                'aprendizajes' => 'Implementar decisiones y repeticiones en programas.',
                'temas' => 'Condicionales, bucles, estructuras de selección.',
            ],
            [
                'idSilabo' => 4,
                'numero' => 3,
                'titulo' => 'Manejo de funciones',
                'duracion_semanas' => '9-12',
                'aprendizajes' => 'Crear funciones para modularizar soluciones.',
                'temas' => 'Definición de funciones, recursividad.',
            ],
            [
                'idSilabo' => 4,
                'numero' => 4,
                'titulo' => 'Estructuras de datos básicas',
                'duracion_semanas' => '13-16',
                'aprendizajes' => 'Utilizar arreglos y estructuras para almacenar datos.',
                'temas' => 'Arreglos unidimensionales y bidimensionales, registros.',
            ],

            // Silabo 5 (Web - 2019)
            [
                'idSilabo' => 5,
                'numero' => 1,
                'titulo' => 'Diseño web responsive',
                'duracion_semanas' => '1-4',
                'aprendizajes' => 'Crear sitios web adaptables a diferentes dispositivos.',
                'temas' => 'HTML5, CSS3, media queries, frameworks CSS.',
            ],
            [
                'idSilabo' => 5,
                'numero' => 2,
                'titulo' => 'JavaScript moderno',
                'duracion_semanas' => '5-8',
                'aprendizajes' => 'Implementar características avanzadas de JavaScript.',
                'temas' => 'ES6+, promesas, async/await, módulos.',
            ],
            [
                'idSilabo' => 5,
                'numero' => 3,
                'titulo' => 'Validación de formularios',
                'duracion_semanas' => '9-12',
                'aprendizajes' => 'Validar datos del usuario de forma efectiva.',
                'temas' => 'JavaScript, validación de entradas, expresiones regulares.',
            ],
            [
                'idSilabo' => 5,
                'numero' => 4,
                'titulo' => 'Consumo de APIs REST',
                'duracion_semanas' => '13-16',
                'aprendizajes' => 'Integrar APIs externas a una web.',
                'temas' => 'fetch, JSON, API públicas.',
            ],

            // Silabo 6 (Redes - 2023)
            [
                'idSilabo' => 6,
                'numero' => 1,
                'titulo' => 'Principios fundamentales de networking',
                'duracion_semanas' => '1-4',
                'aprendizajes' => 'Comprender los fundamentos de la comunicación en redes.',
                'temas' => 'Capas de red, encapsulamiento, protocolos básicos.',
            ],
            [
                'idSilabo' => 6,
                'numero' => 2,
                'titulo' => 'Configuración de switches y VLANs',
                'duracion_semanas' => '5-8',
                'aprendizajes' => 'Implementar redes conmutadas y segmentación lógica.',
                'temas' => 'Funcionamiento de switches, VLANs, trunking.',
            ],
            [
                'idSilabo' => 6,
                'numero' => 3,
                'titulo' => 'Protocolos de enrutamiento',
                'duracion_semanas' => '9-12',
                'aprendizajes' => 'Explicar los fundamentos del enrutamiento dinámico.',
                'temas' => 'RIP, OSPF, EIGRP.',
            ],
            [
                'idSilabo' => 6,
                'numero' => 4,
                'titulo' => 'Redes inalámbricas',
                'duracion_semanas' => '13-16',
                'aprendizajes' => 'Configurar y asegurar redes WiFi.',
                'temas' => 'Estándares 802.11, seguridad inalámbrica, troubleshooting.',
            ],

            // Silabo 7 (Lógica de programación - 2017)
            [
                'idSilabo' => 7,
                'numero' => 1,
                'titulo' => 'Algoritmos y pensamiento lógico',
                'duracion_semanas' => '1-4',
                'aprendizajes' => 'Desarrollar la capacidad de resolución de problemas mediante algoritmos.',
                'temas' => 'Metodología de solución de problemas, algoritmos, pseudocódigo.',
            ],
            [
                'idSilabo' => 7,
                'numero' => 2,
                'titulo' => 'Tipos de datos y expresiones',
                'duracion_semanas' => '5-8',
                'aprendizajes' => 'Utilizar correctamente tipos de datos y operadores.',
                'temas' => 'Variables, constantes, operadores aritméticos y lógicos.',
            ],
            [
                'idSilabo' => 7,
                'numero' => 3,
                'titulo' => 'Problemas condicionales y bucles',
                'duracion_semanas' => '9-12',
                'aprendizajes' => 'Solucionar problemas usando decisiones y repeticiones.',
                'temas' => 'if-else, for, while.',
            ],
            [
                'idSilabo' => 7,
                'numero' => 4,
                'titulo' => 'Estructuras de datos simples',
                'duracion_semanas' => '13-16',
                'aprendizajes' => 'Implementar soluciones usando arreglos.',
                'temas' => 'Vectores, matrices, algoritmos de búsqueda y ordenamiento.',
            ],

            // Silabo 8 (Aplicaciones Web - 2020)
            [
                'idSilabo' => 8,
                'numero' => 1,
                'titulo' => 'Fundamentos de desarrollo web full-stack',
                'duracion_semanas' => '1-4',
                'aprendizajes' => 'Establecer ambiente de desarrollo y comprender arquitecturas web.',
                'temas' => 'Frontend vs Backend, herramientas de desarrollo, git.',
            ],
            [
                'idSilabo' => 8,
                'numero' => 2,
                'titulo' => 'Programación del lado servidor',
                'duracion_semanas' => '5-8',
                'aprendizajes' => 'Desarrollar lógica de negocio en el servidor.',
                'temas' => 'PHP, manejo de peticiones, persistencia de datos.',
            ],
            [
                'idSilabo' => 8,
                'numero' => 3,
                'titulo' => 'Autenticación de usuarios',
                'duracion_semanas' => '9-12',
                'aprendizajes' => 'Implementar sistemas de login y registro.',
                'temas' => 'Manejo de sesiones, cookies, login seguro.',
            ],
            [
                'idSilabo' => 8,
                'numero' => 4,
                'titulo' => 'Despliegue de aplicaciones web',
                'duracion_semanas' => '13-16',
                'aprendizajes' => 'Publicar aplicaciones en servidores web.',
                'temas' => 'FTP, configuraciones básicas, hosting.',
            ],

            // Silabo 9 (Fundamentos de redes - 2024)
            [
                'idSilabo' => 9,
                'numero' => 1,
                'titulo' => 'Introducción a las redes de computadoras',
                'duracion_semanas' => '1-4',
                'aprendizajes' => 'Identificar componentes y tipos de redes.',
                'temas' => 'Tipos de redes, dispositivos de red, estándares.',
            ],
            [
                'idSilabo' => 9,
                'numero' => 2,
                'titulo' => 'Modelo OSI y TCP/IP',
                'duracion_semanas' => '5-8',
                'aprendizajes' => 'Analizar los modelos de referencia de redes.',
                'temas' => 'Capas OSI, suite de protocolos TCP/IP, encapsulamiento.',
            ],
            [
                'idSilabo' => 9,
                'numero' => 3,
                'titulo' => 'Configuración de redes LAN',
                'duracion_semanas' => '9-12',
                'aprendizajes' => 'Diseñar y configurar redes locales.',
                'temas' => 'Switches, VLANs, direccionamiento IP.',
            ],
            [   
                'idSilabo' => 9,
                'numero' => 4,
                'titulo' => 'Seguridad básica en redes',
                'duracion_semanas' => '13-16',
                'aprendizajes' => 'Aplicar medidas de seguridad en redes.',
                'temas' => 'Firewall, antivirus, buenas prácticas.',
            ],
            // Curso de prueba
            [   
                'idUnidad' => 37,
                'idSilabo' => 10,
                'numero' => 1,
                'titulo' => 'Unidad Prueba 1',
                'duracion_semanas' => '1-4',
                'aprendizajes' => 'Aprendizajes Unidad Prueba 1.',
                'temas' => 'Temas Unidad Prueba 1.',
            ],
            [   
                'idUnidad' => 38,
                'idSilabo' => 10,
                'numero' => 2,
                'titulo' => 'Unidad Prueba 2',
                'duracion_semanas' => '5-8',
                'aprendizajes' => 'Aprendizajes Unidad Prueba 2.',
                'temas' => 'Temas Unidad Prueba 2.',
            ],
            [   
                'idUnidad' => 39,
                'idSilabo' => 10,
                'numero' => 3,
                'titulo' => 'Unidad Prueba 3',
                'duracion_semanas' => '9-12',
                'aprendizajes' => 'Aprendizajes Unidad Prueba 3.',
                'temas' => 'Temas Unidad Prueba 3.',
            ],
            [   
                'idUnidad' => 40,
                'idSilabo' => 10,
                'numero' => 4,
                'titulo' => 'Unidad Prueba 4',
                'duracion_semanas' => '13-16',
                'aprendizajes' => 'Aprendizajes Unidad Prueba 4.',
                'temas' => 'Temas Unidad Prueba 4.',
            ],
        ];

        foreach ($unidades as $unidad) {
            Unidad::create($unidad);
        }
    }
}