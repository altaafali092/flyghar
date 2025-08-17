<?php

namespace App\Http\Controllers\Admin\Others;

use App\Enums\GroupTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\Others\ImpContactResource;
use App\Models\Others\ImpContact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ImpContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $importantContacts = ImpContact::latest()->paginate(10);
        return Inertia::render('others/ImportantCall/Index', [
            'importantContacts' => ImpContactResource::collection($importantContacts)->response()->getData(true)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return Inertia::render('others/ImportantCall/Create',[
        'groupTypes'=> GroupTypeEnum::labels(),
       ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
