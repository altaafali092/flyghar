<?php

namespace App\Http\Controllers\Admin\Others;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Http\Requests\Shift\StoreShiftRequest;
use App\Http\Requests\Shift\UpdateShiftRequest;
use App\Http\Resources\Others\ShiftResource;
use App\Models\Others\Shift;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shifts = Shift::latest()->paginate(10);
        return Inertia::render('others/oneTimeSetting/Shift/Index', [
            'shifts' => ShiftResource::collection($shifts)->response()->getData(true),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         return Inertia::render('others/oneTimeSetting/Shift/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShiftRequest $request)
    {
        Shift::create($request->validated());
        return to_route('shifts.index')->with('success', 'Shift created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Shift $shift)
    {
        return Inertia::render('others/oneTimeSetting/Shift/Show', [
            'shift' => $shift,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shift $shift)
    {
        return Inertia::render('others/oneTimeSetting/Shift/Edit', [
            'shift' => $shift,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShiftRequest $request, Shift $shift)
    {
        $shift->update($request->validated());
        return to_route('shifts.index')->with('success', 'Shift updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shift $shift)
    {
        $shift->delete();
        return back()->with('success', 'Shift deleted successfully');
    }

    public function updateStatus(Shift $shift)
    {
        $shift->update([
            'is_active' => !$shift->is_active,
        ]);
        return back()->with('success', 'Shift status updated successfully');
    }
}
