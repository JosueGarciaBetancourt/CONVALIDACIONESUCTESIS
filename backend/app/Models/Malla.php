<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Malla extends BaseModel
{
    use SoftDeletes;
    
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

    // Genera muchas solicitudes
    public function solicitudes()
    {
        return $this->hasMany(Solicitud::class, 'idMalla', 'idMallaConvalidar');
    }

    // Incluye muchos cursos
    public function cursos()
    {
        return $this->hasMany(Curso::class, 'idMalla', 'idMalla');
    }
}
