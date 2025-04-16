<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solicitud extends BaseModel
{
    protected $table = 'Solicitudes';
    protected $primaryKey = 'idSolicitud';
    public $incrementing = true;


    protected $fillable = [
        'idSolicitud', 'codigo', 'idEstudiante', 'idCarreraDestino', 'fechaHora', 'idUsuarioEvaluador'
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
