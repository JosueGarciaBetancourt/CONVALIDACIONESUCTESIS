<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bibliografia extends Model
{
    protected $table = 'Bibliografias';
    protected $primaryKey = 'idBibliografia';
    public $incrementing = true;

    
    protected $fillable = [
        'idBibliografia', 'idSilabo', 'referencia', 'url'
    ];

    // Pertenece a un silabo
    public function silabo()
    {
        return $this->belongsTo(Silabo::class, 'idSilabo', 'idSilabo');
    }
}
