<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unidad extends BaseModel
{
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
