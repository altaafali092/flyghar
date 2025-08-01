<?php

use App\Http\Controllers\Admin\GeneralSettings\FiscalYearController;
use App\Http\Controllers\Admin\GeneralSettings\OfficeSettingController;
use App\Http\Controllers\Admin\GoodsController;
use App\Http\Controllers\Admin\GoodsGroupController;
use App\Http\Controllers\Admin\Others\ContactGroupController;
use App\Http\Controllers\Admin\Others\FeePackageController;
use App\Http\Controllers\Admin\Others\LedgerHeadController;
use App\Http\Controllers\Admin\Others\MainHeadController;
use App\Http\Controllers\Admin\Others\PaymentMethodController;
use App\Http\Controllers\Admin\Others\ShiftController;
use App\Http\Controllers\Admin\Others\SubLedgerHeadController;
use App\Http\Controllers\Admin\Others\WardController;
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
    Route::get('goods-group/{goodsGroup}/update-status', [GoodsGroupController::class, 'updateStatus'])->name('goods-group.updateStatus');

    Route::resource('goods', GoodsController::class);

    Route::resource('fee-packages', FeePackageController::class);
    Route::get('fee-packages/{feePackage}/update-status', [FeePackageController::class, 'updateStatus'])->name('fee-packages.updateStatus');

    Route::resource('shifts', ShiftController::class);
    Route::get('shifts/{shift}/update-status', [ShiftController::class, 'updateStatus'])->name('shifts.updateStatus');

    Route::resource('wards', WardController::class);
    Route::get('wards/{ward}/update-status', [WardController::class, 'updateStatus'])->name('wards.updateStatus');

    Route::resource('contact-groups', ContactGroupController::class);
    Route::get('contact-groups/{contactGroup}/update-status', [ContactGroupController::class, 'updateStatus'])->name('contact-groups.updateStatus');

    Route::resource('payment-methods', PaymentMethodController::class);
    Route::get('payment-methods/{paymentMethod}/update-status', [PaymentMethodController::class, 'updateStatus'])->name('payment-methods.updateStatus');

    Route::resource('main-heads', MainHeadController::class);
    Route::get('main-heads/{mainHead}/update-status', [MainHeadController::class, 'updateStatus'])->name('main-heads.updateStatus');

    Route::resource('ledger-heads', LedgerHeadController::class);
    Route::get('ledger-heads/{ledgerHead}/update-status', [LedgerHeadController::class, 'updateStatus'])->name('ledger-heads.updateStatus');

    Route::resource('sub-ledger-heads', SubLedgerHeadController::class);
    Route::get('sub-ledger-heads/{subLedgerHead}/update-status', [SubLedgerHeadController::class, 'updateStatus'])->name('sub-ledger-heads.updateStatus');

    Route::resource('fiscal-year',FiscalYearController::class);
    Route::get('fiscal-year/{fiscalYear}/update-status',[FiscalYearController::class,'updateStatus'])->name('fiscal-year.updateStatus');

    Route::resource('office-settings', OfficeSettingController::class);

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
