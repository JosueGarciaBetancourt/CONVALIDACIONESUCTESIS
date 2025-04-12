<?php

namespace Database\Seeders;

use App\Models\Universidad;
use Illuminate\Database\Seeder;


class UniversidadSeeder extends Seeder
{
    public function run(): void
    {
        $universidades = [
            [   
                'idUniversidad' => 1,
                'nombre' => 'Universidad Continental',
                'abreviatura' => 'UC',
                'region' => 'Junín',
                'ciudad' => 'Huancayo',
            ],
            [
                'idUniversidad' => 2,
                'nombre' => 'Universidad Tecnológica del Perú',
                'abreviatura' => 'UTP',
                'region' => 'Junín',
                'ciudad' => 'Huancayo',
            ],
            [
                'idUniversidad' => 3,
                'nombre' => 'Universidad Nacional del Centro del Perú',
                'abreviatura' => 'UNCP',
                'region' => 'Junín',
                'ciudad' => 'Huancayo',
            ],
        ];

        foreach ($universidades as $universidad) {
            Universidad::create($universidad);
        }
    }
}
