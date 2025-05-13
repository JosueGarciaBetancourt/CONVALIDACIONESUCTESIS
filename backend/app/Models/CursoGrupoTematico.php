<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CursoGrupoTematico extends BaseModel
{
    use SoftDeletes;
    
    protected $table = 'Cursos_GruposTematicos';
    protected $primaryKey = 'idCursoGrupo';
    public $incrementing = true;

    protected $fillable = [
        'idCursoGrupo', 'idCurso', 'idGrupoTematico', 'peso'
    ];
    
    public function grupoTematico()
    {
        return $this->belongsTo(GrupoTematico::class, 'idGrupoTematico', 'idGrupoTematico');
    }

    public function curso()
    {
        return $this->belongsTo(Curso::class, 'idCurso', 'idCurso');
    }
}
