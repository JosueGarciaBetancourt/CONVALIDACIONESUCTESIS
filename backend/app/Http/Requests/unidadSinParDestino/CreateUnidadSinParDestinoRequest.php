<?php

namespace App\Http\Requests\unidadSinParDestino;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateUnidadSinParDestinoRequest extends FormRequest
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
