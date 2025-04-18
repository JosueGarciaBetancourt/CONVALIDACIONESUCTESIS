<?php

namespace App\Http\Requests\malla;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Malla;

class UpdateMallaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'anio_inicio' => 'sometimes|integer|digits:4',
            'semestre_inicio' => ['sometimes', 'string', 'regex:/^\d{4}-[12]$/'],
            'semestre_fin' => ['sometimes', 'nullable', 'string', 'regex:/^\d{4}-[12]$/'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $anio_inicio = $this->input('anio_inicio');
            $semestre_inicio = $this->input('semestre_inicio');
            $semestre_fin = $this->input('semestre_fin');

            // Validar que anio_inicio coincida con el año de semestre_inicio
            if ($anio_inicio && $semestre_inicio) {
                $anio_semestre_inicio = explode('-', $semestre_inicio)[0];

                if ($anio_inicio != $anio_semestre_inicio) {
                    $validator->errors()->add('semestre_inicio', 'El semestre de inicio no coincide con el año de inicio.');
                }
            }

            // Validar que semestre_fin > semestre_inicio
            if ($semestre_inicio && $semestre_fin) {
                $valor_inicio = intval(str_replace('-', '', $semestre_inicio));
                $valor_fin = intval(str_replace('-', '', $semestre_fin));

                if ($valor_fin <= $valor_inicio) {
                    $validator->errors()->add('semestre_fin', 'El semestre de fin debe ser posterior al de inicio.');
                }
            }
        });
    }
}
