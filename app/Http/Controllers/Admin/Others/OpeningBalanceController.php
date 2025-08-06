<?php

namespace App\Http\Controllers\Admin\Others;

use App\Http\Controllers\Controller;
use App\Http\Resources\Others\OpeningBalanceResource;
use App\Models\Others\OpeningBalance;
use App\Models\Others\SubLedgerHead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OpeningBalanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $openingBalances = OpeningBalance::with(['subLedgerHead','createdBy'])->latest()->paginate(10);
        return Inertia::render('others/AccountSetting/OpeningBalance/Index',[
            'openingBalances'=>OpeningBalanceResource::collection($openingBalances)->response()->getData(true)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $subLedgerHeads = SubLedgerHead::where('status',1)->get();
        return Inertia::render('AccountSetting/OpeningBalance/Create',[
            'subLedgerHeads'=>$subLedgerHeads
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        OpeningBalance::create($request->validated()+[
            'created_by'=>Auth::user()->id
        ]);
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
    public function destroy(OpeningBalance $openingBalance)
    {
       
        if ($openingBalance->getRawOriginal('image')) {
            Storage::disk('public')->delete($openingBalance->getRawOriginal('image'));
        }
        $openingBalance->delete();
        return back()->with('success','Opening Balance Deleted Successfully');
    }
}
