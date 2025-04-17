<?php

namespace App\Http\Requests\estudiante;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEstudianteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => 'sometimes|string',
            'apellido' => 'sometimes|string',
            'email' => [
                'sometimes',
                'string',
                Rule::unique('estudiantes', 'email')->ignore($this->idEstudiante, 'idEstudiante'),
            ],
            'celular' => 'sometimes|digits:9',
        ];
    }
}
