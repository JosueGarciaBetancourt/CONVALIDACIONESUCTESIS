<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    protected $table = 'Estudiantes';
    protected $primaryKey = 'idEstudiante';
    public $incrementing = true;

    protected $fillable = [
        'idEstudiante', 'DNI', 'nombre', 'apellido', 'email', 'celular',
        'idCarreraOrigen', 'idUniversidadOrigen'
    ];
    
    // Pertenece solo a una carrera
    public function carrera()
    {
        return $this->belongsTo(Carrera::class, 'idCarreraOrigen', 'idCarrera');
    } 

    // Pertenece solo a una universidad
    public function universidad()
    {
        return $this->belongsTo(Universidad::class, 'idUniversidadOrigen', 'idUniversidad');
    } 
}
