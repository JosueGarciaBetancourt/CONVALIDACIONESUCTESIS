<?php

namespace App\Http\Requests\comparacion;

use Illuminate\Foundation\Http\FormRequest;

class UpdateComparacionBulkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'comparaciones' => 'required|array|min:1',
            'comparaciones.*.idComparacion' => 'required|integer|exists:comparaciones,idComparacion',
            'comparaciones.*.porcentaje_similitud' => [
                'sometimes',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'comparaciones.*.resultado' => 'nullable|in:0,1',
            'comparaciones.*.justificacion' => 'nullable|string',
            'comparaciones.*.requirio_revision_manual' => 'sometimes|in:0,1',
        ];
    }

    public function messages(): array
    {
        return [
            'porcentaje_similitud.regex' => 'El porcentaje de similitud debe ser un número decimal entre 0 y 1, con máximo dos decimales.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $comparaciones = $this->input('comparaciones');
            $umbral = env('CONVALIDACION_UMBRAL', 0.75);

            foreach ($comparaciones as $index => $comparacion) {
                $porcentaje = $comparacion['porcentaje_similitud'] ?? null;
                $resultado = $comparacion['resultado'] ?? null;

                if ($porcentaje !== null && $resultado !== null) {
                    if ($porcentaje < $umbral && $resultado == 1) {
                        $validator->errors()->add("comparaciones.$index.resultado", 'No puede ser 1 (Aprobado) ya que el porcentaje de similitud es menor al ' . ($umbral * 100) . '%.');
                    }

                    if ($porcentaje >= $umbral && $resultado == 0) {
                        $validator->errors()->add("comparaciones.$index.resultado", 'No puede ser 0 (Rechazado) ya que el porcentaje de similitud es mayor o igual al ' . ($umbral * 100) . '%.');
                    }
                }
            }
        });
    }
}
