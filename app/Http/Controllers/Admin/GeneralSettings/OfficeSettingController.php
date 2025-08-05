<?php

namespace App\Http\Controllers\Admin\GeneralSettings;

use App\Http\Controllers\Controller;
use App\Http\Requests\GeneralSettings\OfficeSetting\StoreOfficeSettingRequest;
use App\Http\Resources\GeneralSettings\OfficeSettingResource;
use App\Models\GeneralSetting\FiscalYear;
use App\Models\GeneralSetting\OfficeSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use function App\Helpers\checkFileExists;
use function App\Helpers\deleteFile;

class OfficeSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $officeSetting = OfficeSetting::latest()->first();
        $fiscalYear = FiscalYear::where('status', 1)->latest()->get();

        if ($officeSetting) {
            $officeSetting = new OfficeSettingResource($officeSetting);
        } else {
            $officeSetting = new OfficeSettingResource(new OfficeSetting());
        }
        return Inertia::render('GeneralSetting/OfficeSetting/Index', [
            'officeSetting' => $officeSetting,
            'fiscalYear' => $fiscalYear,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfficeSettingRequest $request)
    {

        $officeSetting = OfficeSetting::latest()->first();

        if (!empty($officeSetting)) {
            $officeSetting->update(checkFileExists($request->validated(), [
                'office_image' => null,
                'office_cover' => null
            ]));
        } else {
            OfficeSetting::create(checkFileExists($request->validated(), [
                'office_image' => null,
                'office_cover' => null
            ]) + [
                'created_by' => Auth::user()->id,
            ]);
        }

        Cache::forget('office_setting');
        return to_route('office-settings.index')
            ->with('success', 'Office Setting Updated Successfully');
    }

   
}
