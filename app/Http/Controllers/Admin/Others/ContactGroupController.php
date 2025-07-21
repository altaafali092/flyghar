<?php

namespace App\Http\Controllers\Admin\Others;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactGroup\StoreContactGroupRequest;
use App\Http\Requests\ContactGroup\UpdateContactGroupRequest;
use App\Http\Resources\Others\ContactGroupResource;
use App\Models\Others\ContactGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contactGroups = ContactGroup::latest()->paginate(10);
        return Inertia::render('others/oneTimeSetting/ContactGroup/Index', [
            'contactGroups' => ContactGroupResource::collection($contactGroups)->response()->getData(true) // Include meta and links
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('others/oneTimeSetting/ContactGroup/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactGroupRequest $request)
    {
        ContactGroup::create($request->validated());
        return to_route('contact-groups.index')->with('success', 'Contact Group created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(ContactGroup $contactGroup)
    {
        return Inertia::render('others/oneTimeSetting/ContactGroup/Show', [
            'contactGroup' => $contactGroup
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ContactGroup $contactGroup)
    {
        return Inertia::render('others/oneTimeSetting/ContactGroup/Create', [
            'contactGroup' => $contactGroup
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactGroupRequest $request, ContactGroup $contactGroup)
    {
        $contactGroup->update($request->validated());
        return to_route('contact-groups.index')->with('success', 'Contact Group updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContactGroup $contactGroup)
    {
        $contactGroup->delete();
        return back()->with('success', 'Contact Group deleted successfully');
    }

    public function updateStatus(ContactGroup $contactGroup)
    {
        $contactGroup->update([
            'is_active' => !$contactGroup->is_active
        ]);
        return back()->with('success', 'Contact Group status updated successfully');
    }
}
