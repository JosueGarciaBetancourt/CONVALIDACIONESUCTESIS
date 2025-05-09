<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TemasComunes extends BaseModel
{
	use SoftDeletes;

    protected $table = 'Temas_Comunes';
    protected $primaryKey = 'idTemaComun';
    public $incrementing = true;

    protected $fillable = [
        'idTemaComun', 'idUnidadesComparadas', 'tema'
    ];
	
	// Requiere un par de unidades comparadas
	public function unidadesComparadas()
	{
		return $this->belongsTo(UnidadesComparadas::class, 'idUnidadesComparadas', 'idUnidadesComparadas');
	}
}
