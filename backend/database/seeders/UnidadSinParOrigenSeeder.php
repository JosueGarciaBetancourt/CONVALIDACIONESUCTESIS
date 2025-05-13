<?php

namespace Database\Seeders;

use App\Models\UnidadSinParOrigen;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnidadSinParOrigenSeeder extends Seeder
{
    public function run(): void
    {   
        $unidadesSinParOrigen = [
            [   
                'idUnidadSinParOrigen' => 1,
                'idDetalleComparacion' => 2,
                'idUnidad' => 32
            ]
        ];

        foreach ($unidadesSinParOrigen as $uspo) {
            UnidadSinParOrigen::create($uspo);
        }
    }
}
