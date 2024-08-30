<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ModuleController;

Route::get('/', function () {
    return view('home');
});

Route::get('/module-form', function () {
    return view('module.module-form');
})->name("module-form");


Route::get('/module/{name}', [ModuleController::class, 'showModule'])->name('module.show');

Route::get('/section', function () {
    return view('sections.section');
})->name("");

Route::get('/edit-section', function () {
    return view('sections.editSection');
})->name("sections.editSection");

Route::get('/section', [ModuleController::class, 'showDynamicForm'])->name('dynamic-form');