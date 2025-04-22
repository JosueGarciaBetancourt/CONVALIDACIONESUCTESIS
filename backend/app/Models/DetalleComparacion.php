<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetalleComparacion extends BaseModel
{
	use SoftDeletes;

    protected $table = 'Detalle_Comparacion';
    protected $primaryKey = 'idDetalleComparacion';
    public $incrementing = true;

    protected $fillable = [
        'idDetalleComparacion', 'idComparacion', 'similitud_sumilla',
		'similitud_aprendizajes', 'similitud_unidades', 'similitud_bibliografia'
    ];

	// Pertenece a una comparacion
	public function comparacion()
	{
		return $this->belongsTo(Comparacion::class, 'idComparacion', 'idComparacion');
	}
}
