<?php

namespace Database\Seeders;

use App\Models\UnidadesSinParDestino;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnidadesSinParDestinoSeeder extends Seeder
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
            UnidadesSinParDestino::create($uspd);
        }
    }
}
