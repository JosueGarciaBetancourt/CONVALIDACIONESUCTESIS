<?php

namespace Database\Seeders;

use App\Models\UnidadesSinParOrigen;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnidadesSinParOrigenSeeder extends Seeder
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
            UnidadesSinParOrigen::create($uspo);
        }
    }
}
