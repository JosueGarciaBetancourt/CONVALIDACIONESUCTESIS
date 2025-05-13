<?php

namespace App\Http\Requests\curso;

use App\Models\Curso;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class CreateCursoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Reglas base
        if (is_array($this->input()) && array_keys($this->input()) === range(0, count($this->input()) - 1)) {
            return [
                '*.idMalla' => 'required|exists:mallas,idMalla',
                '*.nombre' => 'required|string',
            ];
        }

        return [
            'idMalla' => 'required|exists:mallas,idMalla',
            'nombre' => 'required|string',
        ];
    }

    public function withValidator(Validator $validator)
    {
        $validator->after(function ($validator) {
            $data = $this->all();
            
            // Normalizar a array si es un solo curso
            if (!isset($data[0])) {
                $data = [$data];
            }

            // 1. Validar nombres únicos en el array enviado
            $nombres = array_column($data, 'nombre');
            $duplicados = array_diff_assoc($nombres, array_unique($nombres));
            
            foreach ($duplicados as $index => $nombre) {
                $validator->errors()->add(
                    "$index.nombre",
                    "El nombre '$nombre' está duplicado en esta solicitud."
                );
            }

            // 2. Validar nombres únicos en la base de datos (por malla)
            foreach ($data as $index => $curso) {
                if (isset($curso['idMalla']) && isset($curso['nombre'])) {
                    $exists = Curso::where('idMalla', $curso['idMalla'])
                        ->where('nombre', $curso['nombre'])
                        ->exists();

                    if ($exists) {
                        $validator->errors()->add(
                            "$index.nombre",
                            "El curso '{$curso['nombre']}' ya existe en esta malla."
                        );
                    }
                }
            }
        });
    }
}