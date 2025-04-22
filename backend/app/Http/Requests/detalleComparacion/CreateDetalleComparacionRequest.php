<?php

namespace App\Http\Requests\detallecomparacion;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateDetalleComparacionRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'idComparacion' => [
                'required',
                'exists:comparaciones,idComparacion',
                Rule::unique('detalle_comparacion', 'idComparacion')/* ->ignore($this->idCarrera, 'idCarrera') */,
            ],
            'similitud_sumilla' => [
                'required',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'similitud_aprendizajes' => [
                'required',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'similitud_unidades' => [
                'required',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'similitud_bibliografia' => [
                'required',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'similitud_sumilla.regex' => 'El porcentaje de similitud de sumilla debe ser un número decimal entre 0 y 1, con máximo dos decimales.',
            'similitud_aprendizajes.regex' => 'El porcentaje de similitud de aprendizajes debe ser un número decimal entre 0 y 1, con máximo dos decimales.',
            'similitud_unidades.regex' => 'El porcentaje de similitud de unidades debe ser un número decimal entre 0 y 1, con máximo dos decimales.',
            'similitud_bibliografia.regex' => 'El porcentaje de similitud de bibliografía debe ser un número decimal entre 0 y 1, con máximo dos decimales.',
        ];
    }
}