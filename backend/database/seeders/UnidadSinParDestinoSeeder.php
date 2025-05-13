<?php

namespace Database\Seeders;

use App\Models\UnidadSinParDestino;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnidadSinParDestinoSeeder extends Seeder
{
    public function run(): void
    {   
        $unidadesSinParDestino = [
            [   
                'idUnidadSinParDestino' => 1,
                'idDetalleComparacion' => 3,
                'idUnidad' => 4
            ],
        ];

        foreach ($unidadesSinParDestino as $uspd) {
            UnidadSinParDestino::create($uspd);
        }
    }
}
