<?php

namespace App\Http\Requests\unidadesComparadas;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateUnidadesComparadasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'idDetalleComparacion' => 'required|exists:detalle_comparacion,idDetalleComparacion',
            'idUnidadOrigen' => 'required|exists:unidades,idUnidad',
            'idUnidadDestino' => 'required|exists:unidades,idUnidad',
            'similitud_ponderada' => [
                'required',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'similitud_titulo' => [
                'required',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'similitud_aprendizaje' => [
                'required',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'similitud_temas' => [
                'required',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
        ];
    }
}
