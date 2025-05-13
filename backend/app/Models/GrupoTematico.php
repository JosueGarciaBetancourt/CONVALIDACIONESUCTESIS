<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GrupoTematico extends BaseModel
{
    use SoftDeletes;
    
    protected $table = 'GruposTematicos';
    protected $primaryKey = 'idGrupoTematico';
    public $incrementing = true;

    protected $fillable = [
        'idGrupoTematico', 'nombre', 'descripcion'
    ];
    
    public function cursosGruposTematicos()
    {
        return $this->hasMany(CursoGrupoTematico::class, 'idGrupoTematico', 'idGrupoTematico');
    }
}
