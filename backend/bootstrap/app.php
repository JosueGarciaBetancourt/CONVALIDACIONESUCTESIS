<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Illuminate\Auth\AuthenticationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(\Illuminate\Http\Middleware\HandleCors::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (MethodNotAllowedHttpException $e, $request) {
            if ($request->is('api/*') && $request->expectsJson()) {
                return response()->json([
                    'message' => 'Método HTTP no permitido. Asegúrate de usar el método correcto (POST para login).'
                ], 405);
            }
        });
        
        $exceptions->renderable(function (AuthenticationException $e, $request) {
            if ($request->is('api/*') && $request->expectsJson()) {
                return response()->json([
                    'message' => 'Token inválido o expirado. Por favor, inicia sesión nuevamente.'
                ], 401);
            }
        });
    })->create();