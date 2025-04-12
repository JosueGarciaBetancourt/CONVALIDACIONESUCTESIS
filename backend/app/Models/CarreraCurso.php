<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarreraCurso extends Model
{
    protected $table = 'CarrerasCursos';
    protected $primaryKey = 'idCarreraCurso';
    public $incrementing = true;

    protected $fillable = [
        'idCarreraCurso', 'idCarrera', 'idCurso'
    ];

    // Pertenece a una carrera
    public function carrera()
    {
        return $this->belongsTo(Carrera::class, 'idCarrera', 'idCarrera');
    }
    
    // Pertenece a un curso
    public function curso()
    {
        return $this->belongsTo(Curso::class, 'idCurso', 'idCurso');
    }
}
