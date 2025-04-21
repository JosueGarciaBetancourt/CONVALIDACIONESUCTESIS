<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unidad extends BaseModel
{
    use SoftDeletes;

    protected $table = 'Unidades';
    protected $primaryKey = 'idUnidad';
    public $incrementing = true;


    protected $fillable = [
        'idUnidad', 'idSilabo', 'numero', 'titulo', 'duracion_semanas', 'aprendizajes', 'temas'
    ];

    // Pertenece a un silabo
    public function silabo()
    {
        return $this->belongsTo(Silabo::class, 'idSilabo', 'idSilabo');
    }
}
