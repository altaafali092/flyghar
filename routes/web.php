<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\StudentEnquiryController;
use App\Http\Controllers\Staff\StaffController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('staff', StaffController::class);
    Route::resource('student-enquiry', StudentEnquiryController::class);

    
    Route::resource('permission', PermissionController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
