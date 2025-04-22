<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;

abstract class Controller
{
    public static function printJSON($data) {
        Log::info(json_encode($data, JSON_PRETTY_PRINT));
    }
}
