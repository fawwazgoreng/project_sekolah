<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class programsekolah extends Model
{
    protected $table = 'program_sekolah';
    protected $fillable = ['judul', 'gambar', 'deskripsi'];
}
