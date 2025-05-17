<?php

namespace App\Http\Requests\estadisticasDetalleComparacion;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateEstadisticasDetalleComparacionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'idDetalleComparacion' => 'required|exists:detalle_comparacion,idDetalleComparacion',
            'total_unidades_origen' => 'required|integer',
            'total_unidades_destino' => 'required|integer',
            'total_unidades_emparejadas' => 'required|:unidades,idUnidad',
            'porcentaje_emparejamiento_unidades' => [
                'required',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'total_temas_comunes' => 'required|integer',
            'tiempo_procesamiento_ms' => 'required|integer'
        ];
    }
}
