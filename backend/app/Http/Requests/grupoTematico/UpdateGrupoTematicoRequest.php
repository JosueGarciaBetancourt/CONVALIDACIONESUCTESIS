<?php

namespace App\Http\Requests\grupoTematico;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateGrupoTematicoRequest extends FormRequest
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
                Rule::unique('GrupoTematicos', 'nombre')->ignore($this->idGrupoTematico, 'idGrupoTematico'),
            ],
            'codigo' => [
                'sometimes',
                'string',
                Rule::unique('GrupoTematicos', 'codigo')->ignore($this->idGrupoTematico, 'idGrupoTematico'),
            ],
            'abreviatura' => 'sometimes|string',
            'idUniversidad' => 'sometimes|exists:universidades,idUniversidad',
        ];
    }
}
