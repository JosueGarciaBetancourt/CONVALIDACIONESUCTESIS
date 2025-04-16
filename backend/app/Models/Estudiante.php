<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends BaseModel
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

    // Tiene muchas solicitudes
    public function solicitudes()
    {
        return $this->hasMany(Solicitud::class, 'idEstudiante', 'idEstudiante');
    } 
}
