<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Convalidacion extends Model
{
    protected $table = 'Convalidaciones';
    protected $primaryKey = 'idConvalidacion';
    public $incrementing = true;

    protected $fillable = [
        'idConvalidacion', 'idSolicitud', 'idCursoOrigen', 'idCursoDestino', 'fechaHora',
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
	
	// Tiene un detalle de convalidacion
    public function detalleConvalidacion()
    {
        return $this->hasOne(DetalleConvalidacion::class, 'idConvalidacion', 'idConvalidacion');
    }
    
 	// Genera un resultado de convalidacion
    public function resultado()
    {
		return $this->hasOne(Resultado::class, 'idConvalidacion', 'idConvalidacion');
    }
}
