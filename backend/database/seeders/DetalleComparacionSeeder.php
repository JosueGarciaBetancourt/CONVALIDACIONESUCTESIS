<?php

namespace Database\Seeders;

use App\Models\DetalleComparacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DetalleComparacionSeeder extends Seeder
{
    public function run(): void
    {
        $detallesComparaciones = [
            [   
                'idDetalleComparacion' => 1,
                'idComparacion' => 1,
                //0.72 de similitud general
                'similitud_sumilla' => 0.80, // peso: 30%
                'similitud_aprendizajes' => 0.70, // peso: 25% 
                'similitud_unidades' => 0.75, // peso: 30% 
                'similitud_bibliografia' => 0.50, // peso: 15% 
            ],
            [   
                'idDetalleComparacion' => 2,
                'idComparacion' => 2,
                //0.78 de similitud general
                'similitud_sumilla' => 0.843, // peso: 30%
                'similitud_aprendizajes' => 0.792, // peso: 25% 
                'similitud_unidades' => 0.783, // peso: 30% 
                'similitud_bibliografia' => 0.625, // peso: 15% 
            ],
            [
                'idDetalleComparacion' => 3,
                'idComparacion' => 4,
                //0.30 de similitud general
                'similitud_sumilla' => 0.3245, // peso: 30%
                'similitud_aprendizajes' => 0.3051, // peso: 25%
                'similitud_unidades' => 0.3014, // peso: 30%
                'similitud_bibliografia' => 0.2406, // peso: 15%
            ]
        ];

        foreach ($detallesComparaciones as $detalleComparacion) {
            DetalleComparacion::create($detalleComparacion);
        }
    }
}
