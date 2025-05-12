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

	// Pertenece a una sola comparacion
	public function comparacion()
	{
		return $this->belongsTo(Comparacion::class, 'idComparacion', 'idComparacion');
	}

	// Se resume en una sola tabla de Estadisticas
	public function estadisticas()
	{
		return $this->hasOne(EstadisticasDetalleComparacion::class, 'idDetalleComparacion', 'idDetalleComparacion');
	}

	// Tiene muchas unidades comparadas
	public function unidadesComparadas()
	{
		return $this->hasMany(UnidadesComparadas::class, 'idDetalleComparacion', 'idDetalleComparacion');
	}

	// Tiene muchas unidades sin par origen
	public function unidadesSinParOrigen()
	{
		return $this->hasMany(UnidadesSinParOrigen::class, 'idDetalleComparacion', 'idDetalleComparacion');
	}

	// Tiene muchas unidades sin par destino
	public function unidadesSinParDestino()
	{
		return $this->hasMany(UnidadesSinParDestino::class, 'idDetalleComparacion', 'idDetalleComparacion');
	}
}
