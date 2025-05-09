<?php

namespace Database\Seeders;

use App\Models\DetalleComparacion;
use App\Models\TemasComunes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TemasComunesSeeder extends Seeder
{
    public function run(): void
    {
        $temasComunes = [
            // Silabo 6 (Redes - 2023) vs Silabo 3 (Redes - 2024)
            // Unidades 9 y 21
            [
                'idTemaComun' => 1,
                'idUnidadesComparadas' => 1,
                'tema' => 'Capas de red',
            ],
            [
                'idTemaComun' => 2,
                'idUnidadesComparadas' => 1,
                'tema' => 'Protocolos básicos',
            ],
            [
                'idTemaComun' => 3,
                'idUnidadesComparadas' => 1,
                'tema' => 'Encapsulamiento',
            ],
            // Unidades 10 y 22
            [
                'idTemaComun' => 4,
                'idUnidadesComparadas' => 2,
                'tema' => 'Subnetting',
            ],
            [
                'idTemaComun' => 5,
                'idUnidadesComparadas' => 2,
                'tema' => 'VLANs',
            ],
            // Unidades 11 y 23
            [
                'idTemaComun' => 6,
                'idUnidadesComparadas' => 3,
                'tema' => 'RIP',
            ],
            [
                'idTemaComun' => 7,
                'idUnidadesComparadas' => 3,
                'tema' => 'OSPF',
            ],
            [
                'idTemaComun' => 8,
                'idUnidadesComparadas' => 3,
                'tema' => 'EIGRP',
            ],
            // Unidades 12 y 24
            [
                'idTemaComun' => 9,
                'idUnidadesComparadas' => 4,
                'tema' => 'Seguridad inalámbrica',
            ],
            [
                'idTemaComun' => 10,
                'idUnidadesComparadas' => 4,
                'tema' => 'Firewalls',
            ],
            [
                'idTemaComun' => 11,
                'idUnidadesComparadas' => 4,
                'tema' => 'VPNs',
            ],

            // Silabo 8 (Aplicaciones Web - 2020) vs Silabo 2 (Ingeniería Web - 2018)
            // Unidades 29 y 5
            [
                'idTemaComun' => 12,
                'idUnidadesComparadas' => 5, 
                'tema' => 'Frontend y Backend'
            ],
            [
                'idTemaComun' => 13, 
                'idUnidadesComparadas' => 5,
                'tema' => 'Control de versiones (Git)'
            ],
            [
                'idTemaComun' => 14, 
                'idUnidadesComparadas' => 5,
                'tema' => 'Arquitectura cliente-servidor'
            ],
            [
                'idTemaComun' => 15, 
                'idUnidadesComparadas' => 5, 
                'tema' => 'Protocolo HTTP'
            ],
            [
                'idTemaComun' => 16, 
                'idUnidadesComparadas' => 5, 
                'tema' => 'HTML5 y CSS3'
            ],
            [
                'idTemaComun' => 17, 
                'idUnidadesComparadas' => 5, 
                'tema' => 'Herramientas de desarrollo web'
            ],
            // Unidades 30 y 6
            [
                'idTemaComun' => 18, 
                'idUnidadesComparadas' => 6,
                'tema' => 'PHP'
            ],
            [
                'idTemaComun' => 19, 
                'idUnidadesComparadas' => 6, 
                'tema' => 'Manejo de peticiones HTTP'
            ],
            [
                'idTemaComun' => 20, 
                'idUnidadesComparadas' => 6, 
                'tema' => 'Persistencia de datos'
            ],
            [
                'idTemaComun' => 21, 
                'idUnidadesComparadas' => 6, 
                'tema' => 'Sintaxis JavaScript'
            ],
            [
                'idTemaComun' => 22, 
                'idUnidadesComparadas' => 6, 
                'tema' => 'Manipulación del DOM'
            ],
            [
                'idTemaComun' => 23, 
                'idUnidadesComparadas' => 6, 
                'tema' => 'Eventos en JavaScript'
            ],
            [
                'idTemaComun' => 24, 
                'idUnidadesComparadas' => 6, 
                'tema' => 'AJAX'
            ],
            // Unidades 31 y 7
            [
                'idTemaComun' => 25, 
                'idUnidadesComparadas' => 7, 
                'tema' => 'Manejo de sesiones'
            ],
            [
                'idTemaComun' => 26, 
                'idUnidadesComparadas' => 7, 
                'tema' => 'Cookies'
            ],
            [
                'idTemaComun' => 27, 
                'idUnidadesComparadas' => 7, 
                'tema' => 'Login seguro'
            ],
            [
                'idTemaComun' => 28, 
                'idUnidadesComparadas' => 7, 
                'tema' => 'Formularios HTML'
            ],
            [
                'idTemaComun' => 29, 
                'idUnidadesComparadas' => 7, 
                'tema' => 'Validación de formularios'
            ],
            [
                'idTemaComun' => 30, 
                'idUnidadesComparadas' => 7, 
                'tema' => 'Métodos GET y POST'
            ],
            
            // Silabo 7 (Lógica de programación - 2017) vs Silabo 1 (Programación I - 2015)
            // Unidades 25 y 1
            [
                'idTemaComun' => 31, 
                'idUnidadesComparadas' => 8, 
                'tema' => 'Metodología de solución de problemas'
            ],
            [
                'idTemaComun' => 32, 
                'idUnidadesComparadas' => 8, 
                'tema' => 'Algoritmos'
            ],
            [
                'idTemaComun' => 33, 
                'idUnidadesComparadas' => 8, 
                'tema' => 'Pseudocódigo'
            ],
            [
                'idTemaComun' => 34, 
                'idUnidadesComparadas' => 8, 
                'tema' => 'Diagramas de flujo'
            ],
            // Unidades 26 y 2
            [
                'idTemaComun' => 35, 
                'idUnidadesComparadas' => 9, 
                'tema' => 'Variables y constantes'
            ],
            [
                'idTemaComun' => 36, 
                'idUnidadesComparadas' => 9, 
                'tema' => 'Operadores aritméticos y lógicos'
            ],
            [
                'idTemaComun' => 37, 
                'idUnidadesComparadas' => 9, 
                'tema' => 'Sintaxis básica'
            ],
            [
                'idTemaComun' => 38, 
                'idUnidadesComparadas' => 9, 
                'tema' => 'Entrada y salida de datos'
            ],
            // Unidades 27 y 3
            [
                'idTemaComun' => 39, 
                'idUnidadesComparadas' => 10, 
                'tema' => 'Condicionales (if, else, switch)'
            ],
            [
                'idTemaComun' => 40, 
                'idUnidadesComparadas' => 10, 
                'tema' => 'Bucles (for, while, do-while)'
            ],
        ];

        foreach ($temasComunes as $temaComun) {
            TemasComunes::create($temaComun);
        }
    }
}
