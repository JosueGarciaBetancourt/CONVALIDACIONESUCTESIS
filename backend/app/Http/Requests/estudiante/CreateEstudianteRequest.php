<?php

namespace App\Http\Requests\estudiante;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Carrera;

class CreateEstudianteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'DNI' => [
                'required', 'string', 'size:8',
                Rule::unique('estudiantes', 'DNI'),
            ],
            'nombre' => 'required|string|regex:/^[\pL\s\-]+$/u',
            'apellido' => 'required|string|regex:/^[\pL\s\-]+$/u',
            'email' => [
                'required', 'email',
                Rule::unique('estudiantes', 'email'),
            ],
            'celular' => 'nullable|digits:9',
            'idCarreraOrigen' => 'required|exists:carreras,idCarrera',
            'idUniversidadOrigen' => 'required|exists:universidades,idUniversidad',
        ];
    }

    public function messages(): array
    {
        return [
            'DNI.unique' => 'El DNI ya ha sido registrado anteriormente.',
            'email.unique' => 'El Correo Institucional ya ha sido registrado anteriormente.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $idCarrera = $this->input('idCarreraOrigen');
            $idUniversidad = $this->input('idUniversidadOrigen');

            if ($idCarrera && $idUniversidad) {
                $carrera = Carrera::find($idCarrera);
                if ($carrera && $carrera->idUniversidad != $idUniversidad) {
                    $validator->errors()->add('idCarreraOrigen', 'La carrera no pertenece a la universidad ingresada.');
                }
            }
        });
    }
}
