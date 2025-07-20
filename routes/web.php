<?php

use App\Http\Controllers\Admin\GoodsController;
use App\Http\Controllers\Admin\GoodsGroupController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
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
    Route::resource('role', RoleController::class);

    Route::resource('goods-group', GoodsGroupController::class);
    Route::get('goods-group/{goodsGroup}/update-status', [GoodsGroupController::class,'updateStatus'])->name('goods-group.updateStatus');

    Route::resource('goods', GoodsController::class);
    Route::get('goods/{goods}/update-status', [GoodsController::class,'updateStatus'])->name('goods.updateStatus');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
