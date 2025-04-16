<?php

namespace App\Http\Requests\universidad;

use Illuminate\Foundation\Http\FormRequest;

class CreateUniversidadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => 'required|string|unique:universidades,nombre',
            'abreviatura' => 'required|string|unique:universidades,abreviatura',
            'region' => 'required|string',
            'ciudad' => 'required|string',
        ];
    }
}
