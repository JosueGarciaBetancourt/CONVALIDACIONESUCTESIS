<?php

namespace App\Http\Requests\bibliografia;

use App\Models\Bibliografia;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBibliografiaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'referencia' => 'sometimes|string', 
            'url' => 'sometimes|string',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $idBibliografiaActual = $this->route('idBibliografia');
            $idSilabo = Bibliografia::findOrFail($idBibliografiaActual)->silabo->idSilabo;
            $referencia = $this->input('referencia');
            $url = $this->input('url');

            if (!is_null($referencia)) {
                $exists = Bibliografia::where('idSilabo', $idSilabo)
                                ->where('referencia', $referencia)
                                ->where('idBibliografia', '!=', $idBibliografiaActual)
                                ->exists();
                if ($exists) {
                    $validator->errors()->add('numero', 'El campo referencia ya ha sido registrado con el sílabo actual.');
                }
            }

            if (!is_null($url)) {
                $exists = Bibliografia::where('idSilabo', $idSilabo)
                                ->where('url', $url)
                                ->where('idBibliografia', '!=', $idBibliografiaActual)
                                ->exists();
                if ($exists) {
                    $validator->errors()->add('numero', 'El campo url ya ha sido registrado con el sílabo actual.');
                }
            }
        });
    }
}
