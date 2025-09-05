<?php

use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\EkstrakulikulerController;
use App\Http\Controllers\Api\FasilitasController;
use App\Http\Controllers\Api\KesiswaanController;
use App\Http\Controllers\Api\PrestasiController;
use App\Http\Controllers\Api\ProgramKerjaController;
use App\Http\Controllers\Api\SejarahController;
use App\Http\Controllers\Api\SlideController;
use App\Http\Controllers\Api\VisiMisiController;
use App\Http\Controllers\Api\AuthController; 
use App\Http\Controllers\Api\UserController; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [Authcontroller::class, 'register']);
Route::post('login', [Authcontroller::class, 'login']);

Route::middleware('auth:sanctum')->group(function(){
    Route::resource('users', UserController::class);
});

Route::apiResource('slide', 
    SlideController::class
);

Route::apiResource('about',
    AboutController::class
);

Route::apiResource('programkerja',
    ProgramKerjaController::class
);

Route::apiResource('berita',
    BeritaController::class
);

Route::apiResource('visimisi',
    VisiMisiController::class
);

Route::apiResource('kesiswaan',
    KesiswaanController::class
);

Route::apiResource('sejarah',
    SejarahController::class
);

Route::apiResource('prestasi',
    PrestasiController::class
);

Route::apiResource('fasilitas',
    FasilitasController::class
);

Route::apiResource('ekstra',
    EkstrakulikulerController::class
);

Route::post('admin/register', [
    AdminAuthController::class, 'register'
]);
Route::post('admin/login', [
    AdminAuthController::class, 'login'
]);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('admin/logout', [
        AdminAuthController::class, 'logout'
    ]);
    Route::apiResource('admin', 
    AdminController::class
    );
});