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
                'sometimes', 'string', Rule::unique('grupostematicos', 'nombre')->ignore($this->idGrupoTematico, 'idGrupoTematico'),
            ],
            'descripcion' => 'sometimes|string'
        ];
    }
}
