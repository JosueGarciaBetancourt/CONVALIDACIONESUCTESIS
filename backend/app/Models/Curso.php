<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Curso extends BaseModel
{
    use SoftDeletes;
    
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

    // Aparece en muchas comparaciones
    public function comparacionesComoOrigen()
    {
        return $this->hasMany(Comparacion::class, 'idCursoOrigen', 'idCurso');
    }

    // Aparece en muchas comparaciones
    public function comparacionesComoDestino()
    {
        return $this->hasMany(Comparacion::class, 'idCursoDestino', 'idCurso');
    }
    
    public function cursosGruposTematicos()
    {
        return $this->hasMany(CursoGrupoTematico::class, 'idCurso', 'idCurso');
    }

    protected static function booted()
    {
        // Eliminación de registros en la tabla CarrerasCursos
        static::deleting(function ($curso) {
            if ($curso->isForceDeleting()) {
                $curso->carrerasCursos()->forceDelete();
            } else {
                $curso->carrerasCursos()->each(function ($relacion) {
                    $relacion->delete();
                });
            }
        });

        // Restauración de registros en la tabla CarrerasCursos
        static::restoring(function ($curso) {
            $curso->carrerasCursos()
                ->onlyTrashed()
                ->restore();
        });
    }
}
