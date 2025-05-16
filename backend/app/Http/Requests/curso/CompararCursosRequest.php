<?php

namespace App\Http\Requests\curso;

use Illuminate\Foundation\Http\FormRequest;

class CompararCursosRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'idSolicitud' => 'required|integer|exists:solicitudes,idSolicitud',

            'comparaciones' => 'required|array',
            'comparaciones.*.cursoOrigen' => 'required|array',
            'comparaciones.*.cursoOrigen.idCurso' => 'required|integer|exists:cursos,idCurso',
            'comparaciones.*.cursoOrigen.nombre' => 'required|string',
            'comparaciones.*.cursoOrigen.silabo' => 'required|array',
            'comparaciones.*.cursoOrigen.silabo.idSilabo' => 'required|integer|exists:silabos,idSilabo',
            'comparaciones.*.cursoOrigen.silabo.idCurso' => 'required|integer|exists:cursos,idCurso',
            'comparaciones.*.cursoOrigen.silabo.sumilla' => 'required|string',
            'comparaciones.*.cursoOrigen.silabo.aprendizaje_general' => 'required|string',
            'comparaciones.*.cursoOrigen.silabo.unidades' => 'required|array',
            'comparaciones.*.cursoOrigen.silabo.unidades.*.idUnidad' => 'required|integer|exists:unidades,idUnidad',
            'comparaciones.*.cursoOrigen.silabo.unidades.*.idSilabo' => 'required|integer|exists:silabos,idSilabo',
            'comparaciones.*.cursoOrigen.silabo.unidades.*.numero' => 'required|integer',
            'comparaciones.*.cursoOrigen.silabo.unidades.*.titulo' => 'required|string',
            'comparaciones.*.cursoOrigen.silabo.unidades.*.duracion_semanas' => 'required|string',
            'comparaciones.*.cursoOrigen.silabo.unidades.*.aprendizajes' => 'required|string',
            'comparaciones.*.cursoOrigen.silabo.unidades.*.temas' => 'required|string',
            'comparaciones.*.cursoOrigen.silabo.bibliografias' => 'required|array',
            'comparaciones.*.cursoOrigen.silabo.bibliografias.*.idBibliografia' => 'required|integer|exists:bibliografias,idBibliografia',
            'comparaciones.*.cursoOrigen.silabo.bibliografias.*.idSilabo' => 'required|integer|exists:silabos,idSilabo',
            'comparaciones.*.cursoOrigen.silabo.bibliografias.*.referencia' => 'required|string',
            'comparaciones.*.cursoOrigen.silabo.bibliografias.*.url' => 'required|url',
            
            'comparaciones.*.cursoDestino' => 'required|array',
            'comparaciones.*.cursoDestino.idCurso' => 'required|integer|exists:cursos,idCurso',
            'comparaciones.*.cursoDestino.nombre' => 'required|string',
            'comparaciones.*.cursoDestino.silabo' => 'required|array',
            'comparaciones.*.cursoDestino.silabo.idSilabo' => 'required|integer|exists:silabos,idSilabo',
            'comparaciones.*.cursoDestino.silabo.idCurso' => 'required|exists:cursos,idCurso',
            'comparaciones.*.cursoDestino.silabo.sumilla' => 'required|string',
            'comparaciones.*.cursoDestino.silabo.aprendizaje_general' => 'required|string',
            'comparaciones.*.cursoDestino.silabo.unidades' => 'required|array',
            'comparaciones.*.cursoDestino.silabo.unidades.*.idUnidad' => 'required|integer|exists:unidades,idUnidad',
            'comparaciones.*.cursoDestino.silabo.unidades.*.idSilabo' => 'required|integer|exists:unidades,idUnidad',
            'comparaciones.*.cursoDestino.silabo.unidades.*.numero' => 'required|integer',
            'comparaciones.*.cursoDestino.silabo.unidades.*.titulo' => 'required|string',
            'comparaciones.*.cursoDestino.silabo.unidades.*.duracion_semanas' => 'required|string',
            'comparaciones.*.cursoDestino.silabo.unidades.*.aprendizajes' => 'required|string',
            'comparaciones.*.cursoDestino.silabo.unidades.*.temas' => 'required|string',
            'comparaciones.*.cursoDestino.silabo.bibliografias' => 'required|array',
            'comparaciones.*.cursoDestino.silabo.bibliografias.*.idBibliografia' => 'required|integer|exists:bibliografias,idBibliografia',
            'comparaciones.*.cursoDestino.silabo.bibliografias.*.idSilabo' => 'required|integer|exists:silabos,idSilabo',
            'comparaciones.*.cursoDestino.silabo.bibliografias.*.referencia' => 'required|string',
            'comparaciones.*.cursoDestino.silabo.bibliografias.*.url' => 'nullable|url',
        ];
    }

    public function messages()
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'array' => 'El campo :attribute debe ser un arreglo.',
            'integer' => 'El campo :attribute debe ser un número entero.',
            'string' => 'El campo :attribute debe ser una cadena de texto.',
            'url' => 'El campo :attribute debe ser una URL válida.',
        ];
    }
}