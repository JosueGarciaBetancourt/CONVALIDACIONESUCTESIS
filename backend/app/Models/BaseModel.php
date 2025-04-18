<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class BaseModel extends Model
{
    protected function serializeDate(\DateTimeInterface $date)
    {
        // Asegurarse de que el objeto es una instancia de Carbon
        $carbonDate = Carbon::instance($date);
        
        // Ahora se puede utilizar setTimezone sin problemas
        return $carbonDate->setTimezone(config('app.timezone'))->format('Y-m-d H:i:s');
    }
}
