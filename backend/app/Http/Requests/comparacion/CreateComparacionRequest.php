<?php

namespace App\Http\Requests\comparacion;

use Illuminate\Foundation\Http\FormRequest;

class CreateComparacionRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'idSolicitud' => 'required|exists:solicitudes,idSolicitud',
            'idCursoOrigen' => 'required|exists:cursos,idCurso',
            'idCursoDestino' => 'required|exists:cursos,idCurso',
            'porcentaje_similitud' => [
                'required',
                'numeric',
                'min:0',
                'max:1',
                'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/'
            ],
            'resultado' => 'nullable|in:0,1',
            'justificacion' => 'nullable|string',
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
            $porcentaje_similitud =  $this->input('porcentaje_similitud');
            $resultado = $this->input('resultado');

            if ($porcentaje_similitud < 0.75 && $resultado == 1) {
                $validator->errors()->add('resultado', 'El campo resultado no puedo ser 1 (Aprobado) ya que el porcentaje de similitud es menor al 75%.');
            }

            if ($porcentaje_similitud >= 0.75 && $resultado == 0) {
                $validator->errors()->add('resultado', 'El campo resultado no puedo ser 0 (Rechazado) ya que el porcentaje de similitud es mayor al 75%.');
            }
        });
    }
}