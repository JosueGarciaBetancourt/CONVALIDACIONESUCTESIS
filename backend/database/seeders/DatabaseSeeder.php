<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\EstadisticasComparacion;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $startTime = microtime(true);

        $this->call(UserSeeder::class);
        $this->call(UniversidadSeeder::class);
        $this->call(CarreraSeeder::class);
        $this->call(GrupoTematicoSeeder::class);
        $this->call(EstudianteSeeder::class);
        $this->call(MallaSeeder::class);
        $this->call(CursoSeeder::class);
        $this->call(CarreraCursoSeeder::class);
        $this->call(CursoGrupoTematicoSeeder::class);
        $this->call(SilaboSeeder::class);
        $this->call(UnidadSeeder::class);
        $this->call(BibliografiaSeeder::class);
        $this->call(SolicitudSeeder::class);
        $this->call(ComparacionSeeder::class);
        $this->call(DetalleComparacionSeeder::class);
        $this->call(ResultadoSeeder::class);
        $this->call(UnidadesComparadasSeeder::class);
        $this->call(TemaComunSeeder::class);
        $this->call(UnidadSinParOrigenSeeder::class);
        $this->call(UnidadSinParDestinoSeeder::class);
        $this->call(EstadisticasDetalleComparacionSeeder::class);

        $endTime = microtime(true);
        $totalTime = $endTime - $startTime;
        echo "Tiempo total seeders: " . round($totalTime, 2) . " seg\n"; // Muestra el tiempo total en ms
    }
}
