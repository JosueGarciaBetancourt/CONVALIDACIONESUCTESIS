<?php

namespace App\Http\Requests\resultado;

use App\Models\User;
use App\Models\Curso;
use App\Models\Silabo;
use App\Models\Comparacion;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;
use App\Http\Controllers\ResultadoController;

class CreateResultadoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'idSolicitud' => [
                'required',
                'exists:solicitudes,idSolicitud',
                Rule::unique('resultados', 'idSolicitud'),
            ],
        ];
    }

    // Propiedad para almacenar mensajes de error
    protected $errorMessage = '';

    // Método para obtener el mensaje de error
    public function getErrorMessage()
    {
        return $this->errorMessage;
    }

    public function prepareResultadoData()
    {
        $validated = $this->validated();
        $user = Auth::user();
        
        // Verificar si hay un usuario autenticado
        if (!$user) {
            $this->errorMessage = "No hay un usuario autenticado para asociar al resultado.";
            return null;
        }
        
        // Obtener datos de comparación basados en la solicitud
        $solicitudData = $this->getSolicitudData($validated['idSolicitud']);
        
        // Si hubo error en getSolicitudData, el mensaje ya está establecido
        if ($solicitudData === null) {
            return null;
        }
        
        // Calcular los valores automáticamente
        $cursosConvalidados = $solicitudData['cursosConvalidados'] ?? 0;
        $cursosRechazados = $solicitudData['cursosRechazados'] ?? 0;
        $creditosConvalidados = $solicitudData['creditosConvalidados'] ?? 0;
        $creditosRechazados = $solicitudData['creditosRechazados'] ?? 0;
        
        // Verificar valores mínimos
        if ($cursosConvalidados + $cursosRechazados == 0) {
            $this->errorMessage = "No hay cursos evaluados para generar el resultado.";
            return null;
        }
        
        try {
            $porcentajeSimilitudPromedio = ResultadoController::getPorcentajeSimilitudPromedioByIdSolicitud($validated['idSolicitud']);
            Log::info("porcentajeSimilitudPromedio: $porcentajeSimilitudPromedio");

            $observacionesGenerales = ResultadoController::getObservacionesGenerales(
                                        $cursosConvalidados + $cursosRechazados, 
                                        $cursosConvalidados,
                                        $cursosRechazados, 
                                        $creditosConvalidados + $creditosRechazados,
                                        $creditosConvalidados, 
                                        $creditosRechazados
                                    );
        } catch (\Exception $e) {
            $this->errorMessage = "Error al calcular valores: " . $e->getMessage();
            return null;
        }

        // Construir el array de datos completo
        $data = [
            'idSolicitud' => $validated['idSolicitud'],
            'totalCursosEvaluados' => $cursosConvalidados + $cursosRechazados,
            'cursosConvalidados' => $cursosConvalidados,
            'cursosRechazados' => $cursosRechazados,
            'totalCreditosEvaluados' => $creditosConvalidados + $creditosRechazados,
            'creditosConvalidados' => $creditosConvalidados,
            'creditosRechazados' => $creditosRechazados,
            'porcentajeSimilitudPromedio' => $porcentajeSimilitudPromedio,
            'observacionesGenerales' => $observacionesGenerales,
            'idUser' => $user->id,
            'responsableEvaluacion' => $user->personal_name,
            'cargoResponsable' => $user->cargo,
            'correoResponsable' => $user->corporative_email,
            'DNI' => $user->DNI
        ];
        
        return $data;
    }
    
    /**
     * Obtiene los datos necesarios de la solicitud y sus comparaciones
     * 
     * @param int $idSolicitud
     * @return array|null Datos de la solicitud o null si hay error
     */
    private function getSolicitudData($idSolicitud)
    {
        // Verificar que la solicitud existe y tiene comparaciones
        $comparaciones = Comparacion::where('idSolicitud', $idSolicitud)->get();
        
        if ($comparaciones->isEmpty()) {
            $this->errorMessage = "La solicitud con ID {$idSolicitud} no tiene comparaciones asociadas.";
            return null;
        }
        
        $cursosConvalidados = $comparaciones->where('resultado', 1)->count();
        $cursosRechazados = $comparaciones->where('resultado', 0)->count();
        
        // Verificar que todas las comparaciones tienen un resultado válido
        if ($cursosConvalidados + $cursosRechazados !== $comparaciones->count()) {
            $this->errorMessage = "Existen comparaciones sin un resultado válido (aprobado/rechazado).";
            return null;
        }
        
        // Obtener los créditos sumando de los cursos correspondientes
        $creditosConvalidados = 0;
        $creditosRechazados = 0;
        $cursosSinSilabo = [];
        
        foreach ($comparaciones as $comparacion) {
            // Verificar que el curso de destino existe
            $curso = Curso::find($comparacion->idCursoDestino);
            if (!$curso) {
                $this->errorMessage = "La comparación #{$comparacion->idComparacion} hace referencia a un curso destino que no existe.";
                return null;
            }
            
            $silabo = $curso ? $curso->silabo : null;
            
            // Guardar referencia a cursos sin sílabo para reportar después
            if (!$silabo) {
                $cursosSinSilabo[] = $curso->nombre ?? "Curso ID: {$curso->idCurso}";
                continue;
            }
            
            $creditos = $silabo->creditos ?? 0;
            
            if ($comparacion->resultado) {
                $creditosConvalidados += $creditos;
            } else {
                $creditosRechazados += $creditos;
            }
        }
        
        // Advertir sobre cursos sin sílabo si existen
        if (!empty($cursosSinSilabo)) {
            Log::warning("Algunos cursos no tienen sílabo asociado: " . implode(", ", $cursosSinSilabo));
        }
        
        return [
            'cursosConvalidados' => $cursosConvalidados,
            'cursosRechazados' => $cursosRechazados,
            'creditosConvalidados' => $creditosConvalidados,
            'creditosRechazados' => $creditosRechazados,
        ];
    }
}