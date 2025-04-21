<?php

namespace App\Http\Requests\unidad;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Carrera;

class CreateUnidadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'idSilabo' => 'required|exists:silabos,idSilabo',
            'numero' => [
                'required',
                'integer',
                'min:1',
                Rule::unique('unidades')->where(function ($query) {
                    return $query->where('idSilabo', $this->idSilabo);
                }),
            ],
            'titulo' => 'required|string',
            'duracion_semanas' => 'required|string',
            'aprendizajes' => 'required|string',
            'temas' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'numero.unique' => 'El campo numero ya ha sido registrado con el sílabo actual.',
        ];
    }
}
