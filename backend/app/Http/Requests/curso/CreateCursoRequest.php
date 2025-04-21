<?php

namespace App\Http\Requests\curso;

use App\Models\Malla;
use App\Models\Carrera;
use Illuminate\Foundation\Http\FormRequest;

class CreateCursoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'idMalla' => 'required|exists:mallas,idMalla',
            'nombre' => 'required|string',
        ];
    }
}
