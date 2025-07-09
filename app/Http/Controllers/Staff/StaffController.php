<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffRequest\StoreStaffRequest;
use App\Http\Requests\StaffRequest\UpdateStaffRequest;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staffs = Staff::latest()->paginate(5); // Adjust per-page if needed
        return Inertia::render('Staff/Index', [
            'staffs' => $staffs,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Staff/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStaffRequest $request)
    {

        Staff::create($request->validated());
        return to_route('staff.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Staff $staff)
    {
        return Inertia::render('Staff/View',[
            'staff' => $staff,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staff $staff)
    {
        return Inertia::render('Staff/Edit', [
            'staff' => $staff,
        ]);
    }


    public function update(UpdateStaffRequest $request, Staff $staff)
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($staff->image && Storage::disk('public')->exists($staff->image)) {
                Storage::disk('public')->delete($staff->image);
            }
            // Store new image
            $imagePath = $request->file('image')->store('staff_images', 'public');
            $data['image'] = $imagePath;
        } else {
            if (!isset($data['image'])) {
                unset($data['image']);
            }
        }

        $staff->update($data);

        return to_route('staff.index');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff)
    {
        if ($staff->getRawOriginal('image')) {
            Storage::disk('public')->delete($staff->getRawOriginal('image'));
        }
        $staff->delete();
        return back()->with('success', 'Staff deleted successfully.');
    }
}
