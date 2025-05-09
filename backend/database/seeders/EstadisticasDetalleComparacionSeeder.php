<?php

namespace Database\Seeders;

use App\Models\EstadisticasDetalleComparacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstadisticasDetalleComparacionSeeder extends Seeder
{
    public function run(): void
    {
        $estadisticasDetalleComparacion = [
            // Silabo 6 (Redes - 2023) vs Silabo 3 (Redes - 2024)
            [
                'idEstadisticasDetalleComparacion' => 1,
                'idDetalleComparacion' => 1,
                'total_unidades_origen' => 4,
                'total_unidades_destino' => 4,
                'total_unidades_emparejadas' => 8,
                'porcentaje_emparejamiento_unidades' => 1,
                'total_temas_comunes' => 11,
                'tiempo_procesamiento_ms' => 1200,
            ],

            // Silabo 8 (Aplicaciones Web - 2020) vs Silabo 2 (Ingeniería Web - 2018)
            [
                'idEstadisticasDetalleComparacion' => 2,
                'idDetalleComparacion' => 2,
                'total_unidades_origen' => 4,
                'total_unidades_destino' => 3,
                'total_unidades_emparejadas' => 6,
                'porcentaje_emparejamiento_unidades' => 0.86,
                'total_temas_comunes' => 19,
                'tiempo_procesamiento_ms' => 3000,
            ],

            // Silabo 7 (Lógica de programación - 2017) vs Silabo 1 (Programación I - 2015)
            [
                'idEstadisticasDetalleComparacion' => 3,
                'idDetalleComparacion' => 3,
                'total_unidades_origen' => 3,
                'total_unidades_destino' => 4,
                'total_unidades_emparejadas' => 6,
                'porcentaje_emparejamiento_unidades' => 0.86,
                'total_temas_comunes' => 10,
                'tiempo_procesamiento_ms' => 1500,
            ],
        ];

        foreach ($estadisticasDetalleComparacion as $edc) {
            EstadisticasDetalleComparacion::create($edc);
        }
    }
}
