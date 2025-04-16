<?php

namespace App\Http\Requests\universidad;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUniversidadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => [
                'sometimes',
                'string',
                Rule::unique('universidades', 'nombre')->ignore($this->idUniversidad, 'idUniversidad'),
            ],
            'abreviatura' => [
                'sometimes',
                'string',
                Rule::unique('universidades', 'abreviatura')->ignore($this->idUniversidad, 'idUniversidad'),
            ],
            'region' => 'sometimes|string',
            'ciudad' => 'sometimes|string',
        ];
    }
}
