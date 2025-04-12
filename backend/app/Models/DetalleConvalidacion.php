<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleConvalidacion extends Model
{
    protected $table = 'Detalle_Convalidacion';
    protected $primaryKey = 'idDetalleConvalidacion';
    public $incrementing = true;

    protected $fillable = [
        'idDetalleConvalidacion', 'idConvalidacion', 'similitud_sumilla',
		'similitud_aprendizajes', 'similitud_unidades', 'similitud_bibliografia'
    ];

	// Pertenece a una convalidacion
	public function solicitud()
	{
		return $this->belongsTo(Convalidacion::class, 'idConvalidacion', 'idConvalidacion');
	}
}
