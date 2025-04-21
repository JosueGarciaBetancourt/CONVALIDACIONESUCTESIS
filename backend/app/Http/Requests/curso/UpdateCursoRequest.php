<?php

namespace App\Http\Requests\curso;

use App\Models\Malla;
use App\Models\CarreraCurso;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCursoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'idMalla' => 'sometimes|exists:mallas,idMalla',
            'codigo' => [
                'sometimes',
                'string',
                Rule::unique('cursos', 'codigo')->ignore($this->idCurso, 'idCurso'),
            ],
            'nombre' => 'sometimes|string',
        ];
    }

    public function withValidator($validator)
    {   
        $validator->after(function ($validator) {
            $idCarreraOriginal = CarreraCurso::where('idCurso', $this->route('idCurso'))->value('idCarrera');
            if (!$idCarreraOriginal) return;
            
            $idCarreraNueva = Malla::where('idMalla', $this->input('idMalla'))->value('idCarrera');
            // Log::info(["Carrera original: " . $idCarreraOriginal, "Carrera nueva: " .  $idCarreraNueva]);
          
            if ($idCarreraOriginal && $idCarreraNueva && (int)$idCarreraOriginal !== (int)$idCarreraNueva) {
                $validator->errors()->add('idMalla', 'La malla ingresada no pertenece a la misma carrera que el curso.');
            }
        });
    }
}
