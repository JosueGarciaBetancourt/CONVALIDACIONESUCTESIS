<?php

namespace App\Http\Requests\temaComun;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateTemaComunRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'idUnidadesComparadas' => 'required|exists:unidades_comparadas,idUnidadesComparadas',
            'tema' => 'required|string',
        ];
    }
}
