<?php

namespace App\Http\Requests\carrera;

use Illuminate\Foundation\Http\FormRequest;

class CreateCarreraRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => 'required|string',
            'codigo' => 'nullable|string|unique:carreras,codigo',
            'abreviatura' => 'required|string',
            'idUniversidad' => 'required|exists:universidades,idUniversidad',
        ];
    }
}
