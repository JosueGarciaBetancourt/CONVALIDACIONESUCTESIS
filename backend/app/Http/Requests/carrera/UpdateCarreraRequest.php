<?php

namespace App\Http\Requests\carrera;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCarreraRequest extends FormRequest
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
                Rule::unique('carreras', 'nombre')->ignore($this->idCarrera, 'idCarrera'),
            ],
            'codigo' => [
                'sometimes',
                'string',
                Rule::unique('carreras', 'codigo')->ignore($this->idCarrera, 'idCarrera'),
            ],
            'abreviatura' => 'sometimes|string',
            'idUniversidad' => 'sometimes|exists:universidades,idUniversidad',
        ];
    }
}
