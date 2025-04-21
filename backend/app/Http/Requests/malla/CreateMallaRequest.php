<?php

namespace App\Http\Requests\malla;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateMallaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'idCarrera' => 'required|exists:carreras,idCarrera',
            'anio_inicio' => 'required|integer|digits:4',
            'semestre_inicio' => [
                'required', 'string',
                Rule::unique('mallas')->where(function ($query) {
                    return $query->where('idCarrera', $this->input('idCarrera'))
                                ->where('anio_inicio', $this->input('anio_inicio'));
                }),
            ],
            'semestre_fin' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'semestre_inicio.unique' => 'Ya existe una malla con la misma carrera, año de inicio y semestre de inicio.',
            'idCarrera.required' => 'La carrera es obligatoria.',
            'anio_inicio.required' => 'El año de inicio es obligatorio.',
            'anio_inicio.digits' => 'El año de inicio debe tener exactamente 4 dígitos.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $anio_inicio = $this->input('anio_inicio');
            $semestre_inicio = $this->input('semestre_inicio');
            $semestre_fin = $this->input('semestre_fin');

            // Validar formato esperado
            if (preg_match('/^\d{4}-[12]$/', $semestre_inicio)) {
                $semestre_inicio_anio = explode('-', $semestre_inicio)[0];

                if ($anio_inicio != $semestre_inicio_anio) {
                    $validator->errors()->add('semestre_inicio', 'El semestre de inicio no coincide con el año de inicio.');
                }
            }

            // Validar semestre_fin > semestre_inicio
            if ($semestre_fin) {
                if (
                    preg_match('/^\d{4}-[012]$/', $semestre_inicio) &&
                    preg_match('/^\d{4}-[012]$/', $semestre_fin)
                ) {
                    $inicio_valor = intval(str_replace('-', '', $semestre_inicio));
                    $fin_valor = intval(str_replace('-', '', $semestre_fin));

                    if ($fin_valor <= $inicio_valor) {
                        $validator->errors()->add('semestre_fin', 'El semestre de fin debe ser posterior al semestre de inicio.');
                    }
                } else {
                    $validator->errors()->add('semestre_fin', 'El formato de semestre debe ser YYYY-0, YYYY-1 ó YYYY-2.');
                }
            }
        });
    }

}
