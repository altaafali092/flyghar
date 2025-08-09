<?php

namespace App\Http\Controllers\Admin\Others;

use App\Http\Controllers\Controller;
use App\Http\Requests\OpeningBalance\StoreOpeningBalanceRequest;
use App\Http\Requests\OpeningBalance\UpdateOpeningBalanceRequest;
use App\Http\Resources\Others\OpeningBalanceResource;
use App\Models\GeneralSetting\OfficeSetting;
use App\Models\Others\OpeningBalance;
use App\Models\Others\SubLedgerHead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use function App\Helpers\officeSettings;

class OpeningBalanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $openingBalances = OpeningBalance::with(['subLedgerHead', 'createdBy'])->latest()->paginate(10);
        return Inertia::render('others/AccountSetting/OpeningBalance/Index', [
            'openingBalances' => OpeningBalanceResource::collection($openingBalances)->response()->getData(true)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $subLedgerHeads = SubLedgerHead::where('is_active', 1)->get();
        $fiscalYear = officeSettings()->fiscal_year_id;
        return Inertia::render('others/AccountSetting/OpeningBalance/Create', [
            'subLedgerHeads' => $subLedgerHeads,
            'fiscalYear' => $fiscalYear,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOpeningBalanceRequest $request)
    {
        // Generate new voucher number
        $lastVoucher = OpeningBalance::orderBy('id', 'desc')->value('voucher_no');

        if ($lastVoucher) {
            // Extract numeric part and increment
            $number = (int) str_replace('OV-', '', $lastVoucher);
            $voucherNo = 'OV-' . str_pad($number + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $voucherNo = 'OV-0001';
        }

        $fiscalYearId = officeSettings()?->fiscal_year_id;
        // Loop through rows and insert
        foreach ($request->rows as $row) {
            OpeningBalance::create([
                'voucher_no' => $voucherNo,
                'fiscal_year' => $fiscalYearId,
                'sub_ledger_head_id' => $row['sub_ledger_head_id'],
                'debit' => $row['debit'] ?? 0,
                'credit' => $row['credit'] ?? 0,
                'created_by' => Auth::user()->id,
            ]);
        }

        return redirect()->route('opening-balance.index')
            ->with('success', 'Opening balance created successfully with Voucher No: ' . $voucherNo);
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
    public function edit(OpeningBalance $openingBalance)
    {
        $subLedgerHeads = SubLedgerHead::where('is_active', 1)->get();
        $fiscalYear = officeSettings()->fiscal_year_id;
        return Inertia::render('others/AccountSetting/OpeningBalance/Edit', [
            'subLedgerHeads' => $subLedgerHeads,
            'fiscalYear' => $fiscalYear,
            'openingBalance' => $openingBalance,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOpeningBalanceRequest $request, OpeningBalance $openingBalance)
    {
        $openingBalance->update([
            ...$request->validated(),
            'updated_by' => Auth::user()->id,
        ]);

        return redirect()->route('opening-balance.index')
            ->with('success', 'Opening balance updated successfully');
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
        return back()->with('success', 'Opening Balance Deleted Successfully');
    }

    public function updateStatus(OpeningBalance $openingBalance)
    {
        $openingBalance->update([
            'is_active' => !$openingBalance->is_active,
        ]);
        return back()->with('success', 'Opening Balance Status Updated Successfully');
    }
}
