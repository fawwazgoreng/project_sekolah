<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/storage/{filename}', function ($filename) {
    return response()->file(storage_path('app/public/sejarah/' . $filename));
});
