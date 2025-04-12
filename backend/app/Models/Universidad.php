<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Universidad extends Model
{
    protected $table = 'Universidades';
    protected $primaryKey = 'idUniversidad';
    public $incrementing = true;


    protected $fillable = [
        'idUniversidad', 'nombre', 'abreviatura', 'region', 'ciudad'
    ];
    
    // Tiene muchas carreras
    public function carreras()
    {
        return $this->hasMany(Carrera::class, 'idUniversidad', 'idUniversidad');
    }

    // Tiene muchos estudiantes
    public function estudiantes()
    {
        return $this->hasMany(Estudiante::class, 'idUniversidad', 'idUniversidadOrigen');
    }
}
