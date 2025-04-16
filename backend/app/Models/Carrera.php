<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Carrera extends BaseModel
{
    use SoftDeletes;

    protected $table = 'Carreras';
    protected $primaryKey = 'idCarrera';
    public $incrementing = true;

    protected $fillable = [
        'idCarrera', 'nombre', 'codigo', 'abreviatura', 'idUniversidad'
    ];
    
    // Pertenece a una universidad
    public function universidad()
    {
        return $this->belongsTo(Universidad::class, 'idUniversidad', 'idUniversidad');
    } 

    // Tiene muchos estudiantes
    public function estudiantes()
    {
        return $this->hasMany(Estudiante::class, 'idCarrera', 'idCarreraOrigen');
    }

    // Tiene muchas mallas 
    public function mallas()
    {
        return $this->hasMany(Malla::class, 'idCarrera', 'idCarrera');
    }
    
    // Tiene muchas carreras cursos
    public function solicitudes()
    {
        return $this->hasMany(Solicitud::class, 'idCarrera', 'idCarreraDestino');
    }

    // Tiene muchas carreras cursos
    public function carrerasCursos()
    {
        return $this->hasMany(CarreraCurso::class, 'idCarrera', 'idCarrera');
    }
}
