<?php

namespace App\Http\Requests\unidadSinParOrigen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateUnidadSinParOrigenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'idDetalleComparacion' => 'required|exists:detalle_comparacion,idDetalleComparacion',
            'idUnidad' => 'required|exists:unidades,idUnidad',
        ];
    }
}
