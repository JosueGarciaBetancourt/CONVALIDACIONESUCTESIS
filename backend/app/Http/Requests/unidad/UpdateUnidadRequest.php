<?php

namespace App\Http\Requests\unidad;

use App\Models\Unidad;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUnidadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'numero' => 'sometimes|integer|min:1', 
            'titulo' => 'sometimes|string',
            'duracion_semanas' => 'sometimes|string',
            'aprendizajes' => 'sometimes|string',
            'temas' => 'sometimes|string',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $idUnidadActual = $this->route('idUnidad');
            $idSilabo = Unidad::findOrFail($idUnidadActual)->silabo->idSilabo;
            $numero = $this->input('numero');

            // Validar número único para ese idSilabo, ignorando la unidad actual
            if (!is_null($numero)) {
                $exists = Unidad::where('idSilabo', $idSilabo)
                                ->where('numero', $numero)
                                ->where('idUnidad', '!=', $idUnidadActual)
                                ->exists();
                if ($exists) {
                    $validator->errors()->add('numero', 'El campo número ya ha sido registrado con el sílabo actual.');
                }
            }
        });
    }
}
