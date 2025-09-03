<?php

use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\KesiswaanController;
use App\Http\Controllers\Api\ProgramKerjaController;
use App\Http\Controllers\Api\SejarahController;
use App\Http\Controllers\Api\SlideController;
use App\Http\Controllers\Api\VisiMisiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('slide', 
    SlideController::class
);

Route::apiResource('about',
    AboutController::class
);

Route::apiResource('program_kerja',
    ProgramKerjaController::class
);

Route::apiResource('berita',
    BeritaController::class
);

Route::apiResource('visi_misi',
    VisiMisiController::class
);

Route::apiResource('kesiswaan',
    KesiswaanController::class
);

Route::apiResource('sejarah',
    SejarahController::class
);