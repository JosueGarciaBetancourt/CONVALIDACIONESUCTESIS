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
            'name' => 'Josue',
            'email' => 'josue@example.com', 
            'password' => Hash::make('12345678'),
        ]);

        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com', 
            'password' => Hash::make('12345678'),
        ]);
    }
}
