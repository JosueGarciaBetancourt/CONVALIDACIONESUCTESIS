<?php

namespace App\Http\Requests\cursoGrupoTematico;

use App\Models\CursoGrupoTematico;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class CreateCursoGrupoTematicoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'idCurso' => [
                'required',
                'exists:cursos,idCurso'
            ],
            'idGrupoTematico' => [
                'required',
                'exists:grupostematicos,idGrupoTematico',
                Rule::unique('cursos_grupostematicos')->where(function ($query) {
                    return $query->where('idCurso', $this->input('idCurso'));
                }),
            ],
            'peso' => ['required', 'numeric', 'min:0', 'max:1', 'regex:/^0(\.\d{1,2})?$|^1(\.0{1,2})?$/']
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $exists = CursoGrupoTematico::withTrashed()
                ->where('idCurso', $this->idCarrera)
                ->where('idGrupoTematico', $this->idCurso)
                ->exists();

            if ($exists) {
                $validator->errors()->add('idGrupoTematico', 'Esta relación curso-grupoTematico ya existe o está deshabilitada.');
            }
        });
    }
}
