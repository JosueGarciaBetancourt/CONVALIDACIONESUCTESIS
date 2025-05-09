<?php

namespace App\Http\Requests\solicitud;

use App\Models\Malla;
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
            'idMallaConvalidar' => 'required|exists:mallas,idMalla',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $idCarreraDestino = $this->input('idCarreraDestino');
            $mallaConvalidar = Malla::find($this->input('idMallaConvalidar'));

            if ($mallaConvalidar->idCarrera !== (int)$idCarreraDestino) {
                $validator->errors()->add('idMallaConvalidar', 'La malla a convalidar no pertenece a la carrera destino ingresada.');
            }
        });
    }
}