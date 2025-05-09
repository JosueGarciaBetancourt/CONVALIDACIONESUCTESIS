<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UnidadesSinParDestino extends BaseModel
{
	use SoftDeletes;

    protected $table = 'Unidades_Sin_Par_Destino';
    protected $primaryKey = 'idUnidadSinParDestino';
    public $incrementing = true;

    protected $fillable = [
        'idUnidadSinParDestino', 'idDetalleComparacion', 'idUnidad'
    ];
	
	// Requiere una unidad
	public function unidad()
	{
		return $this->belongsTo(Unidad::class, 'idUnidad', 'idUnidad');
	}

	// Requiere un detalle de comparación
	public function detalleComparacion()
	{
		return $this->belongsTo(DetalleComparacion::class, 'idDetalleComparacion', 'idDetalleComparacion');
	}
}
