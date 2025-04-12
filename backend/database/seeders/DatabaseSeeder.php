<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $startTime = microtime(true);

        $this->call(UserSeeder::class);
        $this->call(UniversidadSeeder::class);
        $this->call(CarreraSeeder::class);
        $this->call(EstudianteSeeder::class);
        $this->call(MallaSeeder::class);
        $this->call(CursoSeeder::class);
        $this->call(CarreraCursoSeeder::class);
        $this->call(SilaboSeeder::class);
        $this->call(UnidadSeeder::class);
        $this->call(BibliografiaSeeder::class);

        $endTime = microtime(true);
        $totalTime = $endTime - $startTime;
        echo "Tiempo total seeders: " . round($totalTime, 2) . " seg\n"; // Muestra el tiempo total en ms
    }
}
