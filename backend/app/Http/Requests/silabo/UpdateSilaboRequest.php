<?php

namespace App\Http\Requests\silabo;

use App\Models\Curso;
use App\Models\Silabo;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSilaboRequest extends FormRequest
{
    /**
     * Variable para almacenar horas calculadas
     */
    public $horas_calculadas = 0;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    public function prepareForValidation()
    {
        $horas_teoria = $this->input('horas_teoria');
        $horas_practica = $this->input('horas_practica');
        
        // Solo si el usuario envió ambos campos pero no el teórico-práctico, lo calculamos
        if ($this->has('horas_teoria') && $this->has('horas_practica') && !$this->has('horas_teoricoPracticas')) {
            // Creamos un nuevo input con otro nombre para uso interno
            $this->merge([
                'horas_calculadas' => (int)$horas_teoria + (int)$horas_practica
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'codigo' => 'sometimes|string',
            'anio' => 'sometimes|integer|digits:4',
            'caracter' => 'nullable|in:Electivo,Obligatorio',
            'creditos' => 'sometimes|integer|min:1',
            'horas_teoria' => 'sometimes|integer|min:1',
            'horas_practica' => 'sometimes|integer|min:1',
            'horas_teoricoPracticas' => 'sometimes|integer|min:1',
            'sumilla' => 'sometimes|string',
            'aprendizaje_general' => 'sometimes|string',
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // Validación del formato del código
            $codigo = $this->input('codigo');

            if ($codigo && strpos($codigo, '-') !== false) {
                $validator->errors()->add('codigo', 'El código del sílabo no puede contener guiones (-).');
            }

            // Validación del año del sílabo
            $anioSilabo = $this->input('anio');
            $silabo = Silabo::findOrFail($this->route('idSilabo'));
            $curso = $silabo->curso;
            
            if ($curso && $anioSilabo && (int)$anioSilabo < (int)$curso->malla->anio_inicio) {
                $validator->errors()->add('anio', 'El año del sílabo no puede ser menor al año de inicio de la malla a la cual se desea asociar.');
            }

            // Validación de campos de horas
            $tiene_teoria = $this->has('horas_teoria');
            $tiene_practica = $this->has('horas_practica');
            $tiene_teoricoPractica = $this->has('horas_teoricoPracticas');
            
            // Si se envió teórico-práctica Y además teoría o práctica => error
            if ($tiene_teoricoPractica && ($tiene_teoria || $tiene_practica)) {
                $validator->errors()->add('horas_teoricoPracticas', 'No puede ingresar horas teórico-prácticas en conjunto con horas teóricas o prácticas. Use teoría + práctica o solo teórico-prácticas.');
            }

            // Caso donde tenemos solo uno de teoría o práctica, pero no ambos
            if (($tiene_teoria && !$tiene_practica && !$tiene_teoricoPractica) || 
                (!$tiene_teoria && $tiene_practica && !$tiene_teoricoPractica)) {
                $validator->errors()->add('horas_teoria', 'Si ingresa horas teóricas o prácticas, debe ingresar ambas.');
            }
        });
    }
    
    /**
     * Get validated data with calculated hours.
     * 
     * @return array
     */
    public function validatedWithCalculatedHours()
    {
        $validated = $this->validated();
        
        // Si tenemos horas_teoria y horas_practica pero no horas_teoricoPracticas, 
        // usamos el valor calculado
        if (isset($validated['horas_teoria']) && isset($validated['horas_practica']) && !isset($validated['horas_teoricoPracticas'])) {
            $validated['horas_teoricoPracticas'] = (int)$validated['horas_teoria'] + (int)$validated['horas_practica'];
        }
        
        return $validated;
    }
}