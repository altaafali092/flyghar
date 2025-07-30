<?php

namespace App\Http\Controllers\Admin\GeneralSettings;

use App\Http\Controllers\Controller;
use App\Http\Requests\GeneralSettings\FiscalYear\StoreFiscalYearRequest;
use App\Http\Requests\GeneralSettings\FiscalYear\UpdateFiscalYearRequest;
use App\Http\Resources\GeneralSettings\FiscalYearResource;
use App\Models\GeneralSeetting\FiscalYear;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FiscalYearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fiscalYears = FiscalYear::latest()->paginate(10);
        return Inertia::render('GeneralSetting/FiscalYear/Index', [
            'fiscalYears' => FiscalYearResource::collection($fiscalYears)->response()->getData(true)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('GeneralSetting/FiscalYear/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFiscalYearRequest $request)
    {
        FiscalYear::create($request->validated());
        return to_route('fiscal-year.index')->with('success', 'FiscalYear added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FiscalYear $fiscalYear)
    {
        return Inertia::render('GeneralSetting/FiscalYear/Create', [
            "fiscalYear" => $fiscalYear,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFiscalYearRequest $request, FiscalYear $fiscalYear)
    {
        $fiscalYear->update($request->validated());
        return to_route('fiscal-year.index')->with('success', 'Fiscal year updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FiscalYear $fiscalYear)
    {
        $fiscalYear->delete();
        return back()->with('success', 'Fiscal year deleted successfully');
    }
    public function updateStatus(FiscalYear $fiscalYear)
    {
        $fiscalYear->update([
            'status' => !$fiscalYear->status
        ]);

        return back()->with('success', 'Status Updated Successfully');
    }
    
}
