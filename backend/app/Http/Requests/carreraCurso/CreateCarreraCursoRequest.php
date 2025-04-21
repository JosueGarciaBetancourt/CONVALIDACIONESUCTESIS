<?php

namespace App\Http\Requests\carreraCurso;

use App\Models\Malla;
use App\Models\Carrera;
use App\Models\CarreraCurso;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class CreateCarreraCursoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'idCarrera' => [
                'required',
                'exists:carreras,idCarrera',
            ],
            'idCurso' => [
                'required',
                'exists:cursos,idCurso',
                Rule::unique('carrerascursos')->where(function ($query) {
                    return $query->where('idCarrera', $this->input('idCarrera'));
                }),
            ],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $exists = CarreraCurso::withTrashed()
                ->where('idCarrera', $this->idCarrera)
                ->where('idCurso', $this->idCurso)
                ->exists();

            if ($exists) {
                $validator->errors()->add('idCurso', 'Esta relación carrera-curso ya existe o está deshabilitada.');
            }
        });
    }
}
