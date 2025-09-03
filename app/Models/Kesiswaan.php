<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kesiswaan extends Model
{
    protected $table = 'kesiswaan';
    protected $fillable = ['gambar', 'judul'];
}
