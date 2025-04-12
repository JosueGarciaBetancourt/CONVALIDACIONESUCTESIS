<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Malla extends Model
{
    protected $table = 'Mallas';
    protected $primaryKey = 'idMalla';
    public $incrementing = true;

    protected $fillable = [
        'idMalla', 'idCarrera', 'anio_inicio', 'semestre_inicio', 'semestre_fin'
    ];
    
    // Pertenece a una carrera
    public function carrera()
    {
        return $this->belongsTo(Carrera::class, 'idCarrera', 'idCarrera');
    }

    // Incluye muchos cursos
    public function cursos()
    {
        return $this->hasMany(Curso::class, 'idMalla', 'idMalla');
    }
}
