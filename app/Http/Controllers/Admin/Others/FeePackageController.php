<?php

namespace App\Http\Controllers\Admin\Others;

use App\Http\Controllers\Controller;
use App\Http\Requests\FeePackage\StoreFeePackageRequest;
use App\Http\Requests\FeePackage\UpdateFeePackageRequest;
use App\Http\Resources\Others\FeePackageResource;
use App\Models\Others\FeePackage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeePackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $feePackages = FeePackage::latest()->paginate(10);
        return Inertia::render('others/oneTimeSetting/feePackage/Index', [
            'feePackages' => FeePackageResource::collection($feePackages)->response()->getData(true),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('others/oneTimeSetting/feePackage/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeePackageRequest $request)
    {
        FeePackage::create($request->validated());
        return to_route('fee-packages.index')->with('success', 'Fee package created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(FeePackage $feePackage)
    {
        return Inertia::render('others/oneTimeSetting/feePackage/Show', [
            'feePackage' => $feePackage,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FeePackage $feePackage)
    {
        return Inertia::render('others/oneTimeSetting/feePackage/Edit', [
            'feePackage' => $feePackage,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeePackageRequest $request, FeePackage $feePackage)
    {
        $feePackage->update($request->validated());
        return to_route('fee-packages.index')->with('success', 'Fee package updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FeePackage $feePackage)
    {
        $feePackage->delete();
        return back()->with('success', 'Fee package deleted successfully');
    }

    public function updateStatus(FeePackage $feePackage)
    {
      $feePackage->update([
            'is_active' => !$feePackage->is_active
        ]);
        return back()->with('success', 'Fee package status updated successfully');
    }
}
