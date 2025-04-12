<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $table = 'Cursos';
    protected $primaryKey = 'idCurso';
    public $incrementing = true;

    protected $fillable = [
        'idCurso', 'idMalla', 'codigo', 'nombre', 'creditos', 'horas_teoria', 
        'horas_practica', 'horas_teoricoPracticas', 'fueComparado'
    ];

    // Pertenece a una malla
    public function malla()
    {
        return $this->belongsTo(Malla::class, 'idMalla', 'idMalla');
    }

    // Tiene muchas carreras cursos
    public function carrerasCursos()
    {
        return $this->hasMany(CarreraCurso::class, 'idCurso', 'idCurso');
    }
    
    // Tiene un silabo
    public function silabo()
    {
        return $this->hasOne(Silabo::class, 'idCurso', 'idCurso');
    }

    // Aparece en muchas convalidaciones
    public function convalidacionesComoOrigen()
    {
        return $this->hasMany(Convalidacion::class, 'idCursoOrigen', 'idCurso');
    }

    // Aparece en muchas convalidaciones
    public function convalidacionesComoDestino()
    {
        return $this->hasMany(Convalidacion::class, 'idCursoDestino', 'idCurso');
    }
}
