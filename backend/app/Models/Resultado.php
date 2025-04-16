<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resultado extends BaseModel
{
    protected $table = 'Resultados';
    protected $primaryKey = 'idResultado';
    public $incrementing = true;

    protected $fillable = [
        'idResultado', 'idSolicitud', 'totalCursosEvaluados', 'totalCursosConvalidados', 
        'totalCursosRechazados', 'totalCreditosEvaluados', 'totalCreditosConvalidados', 'totalCreditosRechazados',
        'nivelSimilitudPromedio', 'observacionesGenerales', 'responsableEvaluacion', 'cargoResponsable',
        'correoResponsable', 'firmaResponsable', 'fechaHoraEmision'
    ];

    // Campos virtuales 
	protected $appends = ['comentarioSimilitudPromedio'];

    public function getComentarioSimilitudPromedioAttribute()
	{
		return match (true) {
			$this->nivelSimilitudPromedio < 0.80 => 'La mayoría de cursos fueron convalidados correctamente.',
			$this->nivelSimilitudPromedio < 0.60 => 'Algunos cursos fueron convalidados correctamente.',
			default => 'Pocos o ningún curso fue convalidado',
		};
	}

    // Pertenece a una sola solicitud
    public function solicitud()
    {
        return $this->belongsTo(Solicitud::class, 'idSolicitud', 'idSolicitud');
    }
}
