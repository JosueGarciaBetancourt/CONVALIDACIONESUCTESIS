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

    protected static function booted()
    {
        // Eliminación de registros en la tabla Cursos_GruposTematicos
        static::deleting(function ($grupoTematico) {
            if ($grupoTematico->isForceDeleting()) {
                $grupoTematico->cursosGruposTematicos()->forceDelete();
            } else {
                $grupoTematico->cursosGruposTematicos()->each(function ($relacion) {
                    $relacion->delete();
                });
            }
        });

        // Restauración de registros en la tabla Cursos_GruposTematicos
        static::restoring(function ($grupoTematico) {
            $grupoTematico->cursosGruposTematicos()
                ->onlyTrashed()
                ->restore();
        }); 
    }
}
