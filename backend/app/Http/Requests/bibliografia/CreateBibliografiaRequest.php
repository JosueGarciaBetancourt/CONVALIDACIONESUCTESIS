<?php

namespace App\Http\Requests\bibliografia;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Carrera;

class CreateBibliografiaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'idSilabo' => 'required|exists:silabos,idSilabo',
            'referencia' => [
                'required',
                'string',
                Rule::unique('bibliografias')->where(function ($query) {
                    return $query->where('idSilabo', $this->idSilabo);
                }),
            ],
            'url' => [
                'required',
                'string',
                Rule::unique('bibliografias')->where(function ($query) {
                    return $query->where('idSilabo', $this->idSilabo);
                }),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'referencia.unique' => 'El campo referencia ya ha sido registrado con el sílabo actual.',
            'url.unique' => 'El campo url ya ha sido registrado con el sílabo actual.',
        ];
    }
}
