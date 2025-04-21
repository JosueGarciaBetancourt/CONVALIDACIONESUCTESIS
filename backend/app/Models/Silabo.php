<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Silabo extends BaseModel
{
    use SoftDeletes;
    
    protected $table = 'Silabos';
    protected $primaryKey = 'idSilabo';
    public $incrementing = true;

    protected $fillable = [
        'idSilabo', 'idCurso', 'codigo', 'anio', 'caracter', 'creditos', 'horas_teoria', 'horas_practica',
        'horas_teoricoPracticas', 'sumilla', 'aprendizaje_general'
    ];
    
    // Pertenece a un curso
    public function curso()
    {
        return $this->belongsTo(Curso::class, 'idCurso', 'idCurso');
    }

    // Contiene muchas unidades
    public function unidades()
    {
        return $this->hasMany(Unidad::class, 'idSilabo', 'idSilabo');
    }

    // Contiene muchas bibliografias
    public function bibliografias()
    {
        return $this->hasMany(Bibliografia::class, 'idSilabo', 'idSilabo');
    }
}
