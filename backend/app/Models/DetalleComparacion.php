<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleComparacion extends BaseModel
{
    protected $table = 'Detalle_Comparacion';
    protected $primaryKey = 'idDetalleComparacion';
    public $incrementing = true;

    protected $fillable = [
        'idDetalleComparacion', 'idComparacion', 'similitud_sumilla',
		'similitud_aprendizajes', 'similitud_unidades', 'similitud_bibliografia'
    ];

	// Pertenece a una solicitud
	public function solicitud()
	{
		return $this->belongsTo(Comparacion::class, 'idComparacion', 'idComparacion');
	}
}
