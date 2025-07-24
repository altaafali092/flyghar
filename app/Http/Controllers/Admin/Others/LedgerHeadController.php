<?php

namespace App\Http\Controllers\Admin\Others;

use App\Http\Controllers\Controller;
use App\Http\Requests\LedgerHead\StoreLedgerHeadRequest;
use App\Http\Requests\LedgerHead\UpdateLedgerHeadRequest;
use App\Http\Resources\Others\LedgerHeadResource;
use App\Models\Others\LedgerHead;
use App\Models\Others\MainHead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LedgerHeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ledgerHeads = LedgerHead::latest()->paginate(10);
        return Inertia::render('others/AccountSetting/LedgerHead/Index', [
            'ledgerHeads' => LedgerHeadResource::Collection($ledgerHeads)->response()->getData(true),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $mainHeads = MainHead::where('status',1)->latest()->get();
        return Inertia::render('others/AccountSetting/LedgerHead/Create', [
            'mainHeads' => $mainHeads,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLedgerHeadRequest $request)
    {
        LedgerHead::create($request->validated());
        return redirect()->route('ledger-heads.index')->with('success', 'Ledger Head Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(LedgerHead $ledgerHead)
    {
        return Inertia::render('others/AccountSetting/LedgerHead/Show', [
            'ledgerHead' => $ledgerHead,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LedgerHead $ledgerHead)
    {
        return Inertia::render('others/AccountSetting/LedgerHead/Create', [
            'ledgerHead' => $ledgerHead,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLedgerHeadRequest $request, LedgerHead $ledgerHead)
    {
        $ledgerHead->update($request->validated());
        return redirect()->route('ledger-heads.index')->with('success', 'Ledger Head Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LedgerHead $ledgerHead)
    {
        $ledgerHead->delete();
        return redirect()->route('ledger-heads.index')->with('success', 'Ledger Head Deleted Successfully');
    }
    public function updateStatus(LedgerHead $ledgerHead)
    {
        $ledgerHead->update([
            'status' => !$ledgerHead->status,
        ]);
        return back()->with('success', 'Ledger Head Status Updated Successfully');
    }
}
