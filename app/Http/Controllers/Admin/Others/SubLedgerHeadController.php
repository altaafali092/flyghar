<?php

namespace App\Http\Controllers\Admin\Others;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubLedgerHead\StoreSubLedgerHeadRequest;
use App\Http\Requests\SubLedgerHead\UpdateSubLedgerHeadRequest;
use App\Http\Resources\Others\SubLedgerHeadResource;
use App\Models\Others\LedgerHead;
use App\Models\Others\SubLedgerHead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubLedgerHeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subLedgerHeads = SubLedgerHead::latest()->paginate(10);
        return Inertia::render('others/AccountSetting/SubLedgerHead/Index', [
            'subLedgerHeads' => SubLedgerHeadResource::collection($subLedgerHeads)->response()->getData(true),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $ledgerHeads = LedgerHead::where('status', 1)->get();
        return Inertia::render('others/AccountSetting/SubLedgerHead/Create', [
            'ledgerHeads' => $ledgerHeads,
        ]);
    }


    public function store(StoreSubLedgerHeadRequest $request)
    {
        $validated = $request->validated();

        $latest = SubLedgerHead::latest('id')->first();
        $nextCode = 'SL-' . str_pad(($latest?->id + 1) ?? 1, 3, '0', STR_PAD_LEFT);

        SubLedgerHead::create([
            ...$validated,
            'sub_ledger_head_code' => $nextCode,
        ]);

        return redirect()->route('sub-ledger-heads.index')->with('success', 'Sub Ledger Head created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SubLedgerHead $subLedgerHead)
    {
        return Inertia::render('others/AccountSetting/SubLedgerHead/Show', [
            'subLedgerHead' => new SubLedgerHeadResource($subLedgerHead),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubLedgerHead $subLedgerHead)
    {
        return Inertia::render('others/AccountSetting/SubLedgerHead/Create', [
            'subLedgerHead' => $subLedgerHead,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubLedgerHeadRequest $request, SubLedgerHead $subLedgerHead)
    {
        $subLedgerHead->update($request->validated());
        return to_route('sub-ledger-heads.index')->with('success', 'Sub Ledger Head updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubLedgerHead $subLedgerHead)
    {
        $subLedgerHead->delete();
        return to_route('sub-ledger-heads.index')->with('success', 'Sub Ledger Head deleted successfully');
    }
}
