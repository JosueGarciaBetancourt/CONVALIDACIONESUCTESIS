<?php

namespace App\Http\Requests\solicitud;

use Illuminate\Foundation\Http\FormRequest;

class CreateSolicitudRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'idEstudiante' => 'required|exists:estudiantes,idEstudiante',
            'idCarreraDestino' => 'required|exists:carreras,idCarrera',
        ];
    }
}