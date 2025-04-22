<?php

namespace App\Http\Requests\detallecomparacion;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDetalleComparacionRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'similitud_sumilla' => [
                'sometimes',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'similitud_aprendizajes' => [
                'sometimes',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'similitud_unidades' => [
                'sometimes',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'similitud_bibliografia' => [
                'sometimes',
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