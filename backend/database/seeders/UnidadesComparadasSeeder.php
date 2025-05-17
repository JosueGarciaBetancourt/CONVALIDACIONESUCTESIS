<?php

namespace Database\Seeders;

use App\Models\UnidadesComparadas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnidadesComparadasSeeder extends Seeder
{
    public function run(): void
    {   
        $unidadesComparadas = [
            // Silabo 6 (Redes - 2023) vs Silabo 3 (Redes - 2024)
            [   
                'idUnidadesComparadas' => 1,
                'idDetalleComparacion' => 1,
                'idUnidadOrigen' => 9,
                'idUnidadDestino' => 21,
                'similitud_ponderada' => 0.83,
                'similitud_titulo' => 0.85,
                'similitud_aprendizaje' => 0.83,
                'similitud_temas' => 0.81,
            ],
            [   
                'idUnidadesComparadas' => 2,
                'idDetalleComparacion' => 1,
                'idUnidadOrigen' => 10,
                'idUnidadDestino' => 22,
                'similitud_ponderada' => 0.73,
                'similitud_titulo' => 0.70,
                'similitud_aprendizaje' => 0.75,
                'similitud_temas' => 0.74,
            ],
            [   
                'idUnidadesComparadas' => 3,
                'idDetalleComparacion' => 1,
                'idUnidadOrigen' => 11,
                'idUnidadDestino' => 23,
                'similitud_ponderada' => 0.80,
                'similitud_titulo' => 0.78,
                'similitud_aprendizaje' => 0.81,
                'similitud_temas' => 0.81,
            ],
            [   
                'idUnidadesComparadas' => 4,
                'idDetalleComparacion' => 1,
                'idUnidadOrigen' => 12,
                'idUnidadDestino' => 24,
                'similitud_ponderada' => 0.64,
                'similitud_titulo' => 0.65,
                'similitud_aprendizaje' => 0.62,
                'similitud_temas' => 0.65,
            ],

            // Silabo 8 (Aplicaciones Web - 2020) vs Silabo 2 (Ingeniería Web - 2018)
            [
                'idUnidadesComparadas' => 5,
                'idDetalleComparacion' => 2,
                'idUnidadOrigen' => 29,
                'idUnidadDestino' => 5,
                'similitud_ponderada' => 0.80,
                'similitud_titulo' => 0.85,
                'similitud_aprendizaje' => 0.78,
                'similitud_temas' => 0.77,
            ],
            [
                'idUnidadesComparadas' => 6,
                'idDetalleComparacion' => 2,
                'idUnidadOrigen' => 30,
                'idUnidadDestino' => 6,
                'similitud_ponderada' => 0.78,
                'similitud_titulo' => 0.80,
                'similitud_aprendizaje' => 0.76,
                'similitud_temas' => 0.78,
            ],
            [
                'idUnidadesComparadas' => 7,
                'idDetalleComparacion' => 2,
                'idUnidadOrigen' => 31,
                'idUnidadDestino' => 7,
                'similitud_ponderada' => 0.769,
                'similitud_titulo' => 0.77,
                'similitud_aprendizaje' => 0.75,
                'similitud_temas' => 0.78,
            ],
            
            // Silabo 7 (Lógica de programación - 2017) vs Silabo 1 (Programación I - 2015)
            [
                'idUnidadesComparadas' => 8,
                'idDetalleComparacion' => 3,
                'idUnidadOrigen' => 25,
                'idUnidadDestino' => 1,
                'similitud_ponderada' => 0.80,
                'similitud_titulo' => 0.85,
                'similitud_aprendizaje' => 0.78,
                'similitud_temas' => 0.77,
            ],
            [
                'idUnidadesComparadas' => 9,
                'idDetalleComparacion' => 3,
                'idUnidadOrigen' => 26,
                'idUnidadDestino' => 2,
                'similitud_ponderada' => 0.78,
                'similitud_titulo' => 0.80,
                'similitud_aprendizaje' => 0.76,
                'similitud_temas' => 0.78,
            ],
            [
                'idUnidadesComparadas' => 10,
                'idDetalleComparacion' => 3,
                'idUnidadOrigen' => 27,
                'idUnidadDestino' => 3,
                'similitud_ponderada' => 0.769,
                'similitud_titulo' => 0.77,
                'similitud_aprendizaje' => 0.75,
                'similitud_temas' => 0.78,
            ],
        ];

        foreach ($unidadesComparadas as $uniComp) {
            UnidadesComparadas::create($uniComp);
        }
    }
}
