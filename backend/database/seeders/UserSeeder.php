<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'id' => 1,
            'name' => 'Admin',
            'email' => 'admin@example.com', 
            'password' => Hash::make('12345678'),
            'DNI' => '12345678',
            'personal_name' => 'Admin Convalidaciones',
            'cargo' => 'Coordinador de Convalidaciones',
            'corporative_email' =>  '12345678@continental.edu.pe', 
        ]);

        User::create([
            'name' => 'Josue',
            'email' => 'josue@example.com', 
            'password' => Hash::make('12345678'),
            'DNI' => '77043114',
            'personal_name' => 'Ing. Josué García Betancourt',
            'cargo' => 'Asistente de Convalidaciones',
            'corporative_email' =>  '77043114@continental.edu.pe', 
        ]);
    }
}
