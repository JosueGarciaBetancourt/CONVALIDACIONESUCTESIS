<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UnidadesComparadas extends BaseModel
{
	use SoftDeletes;

    protected $table = 'Unidades_Comparadas';
    protected $primaryKey = 'idUnidadesComparadas';
    public $incrementing = true;

    protected $fillable = [
        'idUnidadesComparadas', 'idDetalleComparacion', 'idUnidadOrigen', 'idUnidadDestino', 'similitud_promedio', 
		'similitud_titulo', 'similitud_aprendizaje', 'similitud_temas', 'tipo'
    ];

	// Requiere una unidad origen
	public function unidadOrigen()
	{
		return $this->belongsTo(Unidad::class, 'idUnidadOrigen', 'idUnidad');
	}

	// Requiere una unidad destino
	public function unidadDestino()
	{
		return $this->belongsTo(Unidad::class, 'idUnidadDestino', 'idUnidad');
	}

	// Requiere un detalle de comparación
	public function detalleComparacion()
	{
		return $this->belongsTo(DetalleComparacion::class, 'idDetalleComparacion', 'idDetalleComparacion');
	}

	// Incluye muchos temas comunes
    public function temasComunes()
    {
        return $this->hasMany(TemasComunes::class, 'idUnidadesComparadas', 'idUnidadesComparadas');
    }
}
