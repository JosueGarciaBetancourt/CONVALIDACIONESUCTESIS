<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comparacion extends BaseModel
{
    protected $table = 'Comparaciones';
    protected $primaryKey = 'idComparacion';
    public $incrementing = true;

    protected $fillable = [
        'idComparacion', 'idSolicitud', 'idCursoOrigen', 'idCursoDestino', 'idResultado', 'fechaHora',
		'porcentaje_similitud', 'resultado', 'justificacion'
    ];

	// Campos virtuales 
	protected $appends = ['nivelSimilitud'];

    public function getNivelSimilitudAttribute()
	{
		return match (true) {
			$this->porcentaje_similitud < 0.75 => 'Similitud baja',
			$this->porcentaje_similitud < 0.90 => 'Similitud intermedia',
			default => 'Similitud alta',
		};
	}

	// Pertenece a una solicitud
	public function solicitud()
	{
		return $this->belongsTo(Solicitud::class, 'idSolicitud', 'idSolicitud');
	}

	// Requiere un curso origen
	public function cursoOrigen()
	{
		return $this->belongsTo(Curso::class, 'idCursoOrigen', 'idCurso');
	}

	// Requiere un curso destino
	public function cursoDestino()
	{
		return $this->belongsTo(Curso::class, 'idCursoDestino', 'idCurso');
	}
	
	// Tiene un detalle de comparacion
    public function detalleComparacion()
    {
        return $this->hasOne(DetalleComparacion::class, 'idComparacion', 'idComparacion');
    }
}
