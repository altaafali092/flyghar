<?php

namespace App\Http\Controllers\Admin\Others;

use App\Enums\AccountGroupEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\MainHead\StoreMainHeadRequest;
use App\Http\Requests\MainHead\UpdateMainHeadRequest;
use App\Http\Resources\Others\MainHeadResource;
use App\Models\Others\MainHead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MainHeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mainHeads = MainHead::latest()->paginate(10);
        return Inertia::render('others/AccountSetting/MainHead/Index', [
            'mainHeads' => MainHeadResource::collection($mainHeads)->response()->getData(true),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('others/AccountSetting/MainHead/Create', [
            'accountGroups' => AccountGroupEnum::labels(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMainHeadRequest $request)
    {
        MainHead::create($request->validated());
        return to_route('main-heads.index')->with('success', 'Main Head Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(MainHead $mainHead)
    {
        return Inertia::render('others/AccountSetting/MainHead/View', [
            'mainHead' => $mainHead,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MainHead $mainHead)
    {
        return Inertia::render('others/AccountSetting/MainHead/Create', [
            'mainHead' => $mainHead,
            'accountGroups' => AccountGroupEnum::labels(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMainHeadRequest $request, MainHead $mainHead)
    {
        $mainHead->update($request->validated());
        return to_route('main-heads.index')->with('success', 'Main Head Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MainHead $mainHead)
    {
        $mainHead->delete();
        return to_route('main-heads.index')->with('success', 'Main Head Deleted Successfully');
    }
    public function updateStatus(MainHead $mainHead)
    {
        $mainHead->update([
            'status' => !$mainHead->status,
        ]);
        return to_route('main-heads.index')->with('success', 'Main Head Status Updated Successfully');
    }
}
