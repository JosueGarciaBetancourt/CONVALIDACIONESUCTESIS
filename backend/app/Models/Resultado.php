<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resultado extends Model
{
    protected $table = 'Resultados';
    protected $primaryKey = 'idResultado';
    public $incrementing = true;

    protected $fillable = [
        'idResultado', 'idConvalidacion', 'totalCursosEvaluados', 'totalCursosAprobados', 
        'totalCursosRechazados', 'totalCreditosConvalidados', 'porcentaje_similitud',
        'observacionesGenerales', 'responsableEvaluacion', 'cargoResponsable', 'correoResponsable',
        'firmaResponsable', 'cargoFirmante', 'fechaHoraEmision',
    ];

    // Pertenece a una convalidacion
    public function convalidacion()
    {
        return $this->belongsTo(Convalidacion::class, 'idConvalidacion', 'idConvalidacion');
    }
}
