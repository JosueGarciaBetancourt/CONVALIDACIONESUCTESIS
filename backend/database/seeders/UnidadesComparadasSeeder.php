<?php

namespace Database\Seeders;

use App\Models\DetalleComparacion;
use App\Models\UnidadesComparadas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnidadesComparadasSeeder extends Seeder
{
    public function run(): void
    {
        $unidadesComparadas = [
            [   
                'idUnidadesComparadas' => 1,
                'idDetalleComparacion' => 1,
                'idUnidadOrigen' => 9,
                'idUnidadDestino' => 21,
                'similitud_promedio' => 0.83,
                'similitud_titulo' => 0.85,
                'similitud_aprendizaje' => 0.83,
                'similitud_temas' => 0.81,
                'tipo' => 'Equivalencia Directa',
            ],
            [   
                'idUnidadesComparadas' => 2,
                'idDetalleComparacion' => 1,
                'idUnidadOrigen' => 10,
                'idUnidadDestino' => 22,
                'similitud_promedio' => 0.73,
                'similitud_titulo' => 0.70,
                'similitud_aprendizaje' => 0.75,
                'similitud_temas' => 0.74,
                'tipo' => 'Equivalencia Directa',
            ],
            [   
                'idUnidadesComparadas' => 3,
                'idDetalleComparacion' => 1,
                'idUnidadOrigen' => 11,
                'idUnidadDestino' => 23,
                'similitud_promedio' => 0.80,
                'similitud_titulo' => 0.78,
                'similitud_aprendizaje' => 0.81,
                'similitud_temas' => 0.81,
                'tipo' => 'Equivalencia Directa',
            ],
            [   
                'idUnidadesComparadas' => 4,
                'idDetalleComparacion' => 1,
                'idUnidadOrigen' => 12,
                'idUnidadDestino' => 24,
                'similitud_promedio' => 0.64,
                'similitud_titulo' => 0.65,
                'similitud_aprendizaje' => 0.62,
                'similitud_temas' => 0.65,
                'tipo' => 'Mejor Coincidencia',
            ],
        ];

        foreach ($unidadesComparadas as $uniComp) {
            UnidadesComparadas::create($uniComp);
        }
    }
}
