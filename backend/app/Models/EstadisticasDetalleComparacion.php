<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EstadisticasDetalleComparacion extends BaseModel
{
	use SoftDeletes;

    protected $table = 'Estadisticas_Detalle_Comparacion';
    protected $primaryKey = 'idEstadisticasDetalleComparacion';
    public $incrementing = true;

    protected $fillable = [
        'idEstadisticasDetalleComparacion', 'idDetalleComparacion', 'total_unidades_origen', 
		'total_unidades_destino', 'total_unidades_emparejadas', 'porcentaje_emparejamiento_unidades', 
		'total_temas_comunes', 'tiempo_procesamiento_ms'
    ];
	
	// Requiere un detalle de comparación
	public function detalleComparacion()
	{
		return $this->belongsTo(DetalleComparacion::class, 'idDetalleComparacion', 'idDetalleComparacion');
	}
}
