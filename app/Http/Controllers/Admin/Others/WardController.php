<?php

namespace App\Http\Controllers\Admin\Others;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ward\StoreWardRequest;
use App\Http\Requests\Ward\UpdateWardRequest;
use App\Http\Resources\Others\WardResource;
use App\Models\Others\Ward;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wards=Ward::latest()->paginate(10);
        return Inertia::render('others/oneTimeSetting/Ward/Index', [
            'wards' => WardResource::collection($wards)->response()->getData(true),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('others/oneTimeSetting/Ward/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWardRequest $request)
    {
        Ward::create($request->validated());
        return to_route('wards.index')->with('success', 'Ward created successfully');
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
    public function edit(Ward $ward)
    {
        return Inertia::render('others/oneTimeSetting/Ward/Create', [
            'ward' => $ward,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWardRequest $request, Ward $ward)
    {
        $ward->update($request->validated());
        return to_route('wards.index')->with('success', 'Ward updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ward $ward)
    {
        $ward->delete();
        return back()->with('success', 'Ward deleted successfully');
    }

    public function updateStatus( Ward $ward)
    {
        $ward->update([
            'is_active'=>!$ward->is_active,
        ]);
        return back()->with('success', 'Ward status updated successfully');
    }
}
