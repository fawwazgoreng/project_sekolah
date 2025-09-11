<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    use HasApiTokens, HasFactory;
    use Notifiable;
    protected $table = 'admin';
    protected $fillable = ['username', 'password'];
    protected $hidden = ['password'];
}
