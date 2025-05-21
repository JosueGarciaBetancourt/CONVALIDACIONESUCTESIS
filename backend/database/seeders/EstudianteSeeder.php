<?php

namespace Database\Seeders;

use App\Models\Estudiante;
use Illuminate\Database\Seeder;


class EstudianteSeeder extends Seeder
{
    public function run(): void
    {
        $estudiantes = [
            [   
                'idEstudiante' => 1,
                'DNI' => '77043114',
                'nombre' => 'Josué',
                'apellido' => 'García Betancourt',
                'email' => '77043114@continental.edu.pe',
                'celular' => '964866527',
                'idCarreraOrigen' => 1, // UC-ISI
                'idUniversidadOrigen' => 1, // UC
            ],
            [
                'idEstudiante' => 2,
                'DNI' => '77665544',
                'nombre' => 'Gabriel',
                'apellido' => 'Martinez Sanabria',
                'email' => '77665544@utp.edu.pe',
                'celular' => '999888777',
                'idCarreraOrigen' => 2, // UTP-ISI
                'idUniversidadOrigen' => 2, // UTP
            ],
            [
                'idEstudiante' => 3,
                'DNI' => '66582315',
                'nombre' => 'Gabriela',
                'apellido' => 'Torres Medina',
                'email' => '66582315@uncp.edu.pe',
                'celular' => '987654321',
                'idCarreraOrigen' => 3, // UNCP-IS
                'idUniversidadOrigen' => 3, // UNCP
            ],
            [
                'idEstudiante' => 4,
                'DNI' => '99887766',
                'nombre' => 'Nombre de Prueba',
                'apellido' => 'Apellido de Prueba',
                'email' => '99887766@continental.edu.pe',
                'celular' => '998877665',
                'idCarreraOrigen' => 2, // UTP-ISI
                'idUniversidadOrigen' => 2, // UTP
            ]
        ];

        foreach ($estudiantes as $estudiante) {
            Estudiante::create($estudiante);
        }
    }
}
