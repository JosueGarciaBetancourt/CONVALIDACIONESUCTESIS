<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Solicitud extends BaseModel
{
    use SoftDeletes;
    
    protected $table = 'Solicitudes';
    protected $primaryKey = 'idSolicitud';
    public $incrementing = true;


    protected $fillable = [
        'idSolicitud', 'codigo', 'idEstudiante', 'idCarreraDestino', 'idMallaConvalidar', 'fechaHora', 'idUsuarioEvaluador'
    ];

    // Es evaluada por un usuario
    public function user()
    {
        return $this->belongsTo(User::class, 'idUsuarioEvaluador', 'id');
    }

    // Requiere solo una carrera
    public function carrera()
    {
        return $this->belongsTo(Carrera::class, 'idCarreraDestino', 'idCarrera');
    }

    // Requiere solo una malla
    public function malla()
    {
        return $this->belongsTo(Malla::class, 'idMallaConvalidar', 'idMalla');
    }

    // Requiere solo un estudiante
    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'idEstudiante', 'idEstudiante');
    }

    // Tiene muchas comparaciones (pares de cursos)
    public function comparaciones()
    {
        return $this->hasMany(Comparacion::class, 'idSolicitud', 'idSolicitud');
    }

    // Genera un resultado
    public function resultado()
    {
        return $this->hasOne(Resultado::class, 'idSolicitud', 'idSolicitud');
    }
}
