<?php

namespace App\Http\Requests\grupoTematico;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateGrupoTematicoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => [
                'required', 'string', Rule::unique('grupostematicos', 'nombre'),
            ],
            'descripcion' => 'nullable|string'
        ];
    }
}
