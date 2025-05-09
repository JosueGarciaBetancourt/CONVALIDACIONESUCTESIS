<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UnidadesSinParOrigen extends BaseModel
{
	use SoftDeletes;

    protected $table = 'Unidades_Sin_Par_Origen';
    protected $primaryKey = 'idUnidadSinParOrigen';
    public $incrementing = true;

    protected $fillable = [
        'idUnidadSinParOrigen', 'idDetalleComparacion', 'idUnidad'
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
