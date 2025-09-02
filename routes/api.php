<?php

use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\SlideController;
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