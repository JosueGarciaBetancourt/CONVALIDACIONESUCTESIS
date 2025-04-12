<?php

namespace Database\Seeders;

use App\Models\CarreraCurso;
use Illuminate\Database\Seeder;

class CarreraCursoSeeder extends Seeder
{
    public function run(): void
    {
        $carrerasCursos = [
            ['idCarrera' => 1, 'idCurso' => 1],
            ['idCarrera' => 1, 'idCurso' => 2],
            ['idCarrera' => 1, 'idCurso' => 3],
            
            ['idCarrera' => 2, 'idCurso' => 4],
            ['idCarrera' => 2, 'idCurso' => 5],
            ['idCarrera' => 2, 'idCurso' => 6],
            
            ['idCarrera' => 3, 'idCurso' => 7],
            ['idCarrera' => 3, 'idCurso' => 8],
            ['idCarrera' => 3, 'idCurso' => 9],
        ];

        foreach ($carrerasCursos as $carrerasCurso) {
            CarreraCurso::create($carrerasCurso); // Timestamps automáticos
        }
    }
}
