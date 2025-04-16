<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected function serializeDate(\DateTimeInterface $date)
    {
        $carbonDate = Carbon::instance($date);
        return $carbonDate->setTimezone(config('app.timezone'))->format('Y-m-d H:i:s');
    }
    
    // Evalua muchas solicitudes
    public function solicitudes()
    {
        return $this->hasMany(Solicitud::class, 'id', 'idUsuarioEvaluador');
    }
}
