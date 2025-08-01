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
        $validated = $request->validated();
        $officeSetting = OfficeSetting::latest()->first();

        // Prepare file settings
        $fileSettings = [
            'office_image' => null,
            'office_cover' => null
        ];

        // Handle existing office setting
        if ($officeSetting) {
            // Delete existing files if new ones are uploaded
            $this->handleFileDeletes($request, $officeSetting);

            $officeSetting->update(
                checkFileExists($validated, $fileSettings)
            );
        } else {
            // Create new office setting
            OfficeSetting::create(
                checkFileExists($validated, $fileSettings) + [
                    'created_by' => Auth::user()->id,
                ]
            );
        }

        // Clear cache and redirect
        Cache::forget('office_setting');
        return to_route('office-settings.index')
            ->with('success', 'Office Setting Updated Successfully');
    }

    /**
     * Handle deletion of existing files
     */
    private function handleFileDeletes(Request $request, OfficeSetting $officeSetting): void
    {
        $filesToCheck = ['office_image', 'office_cover'];

        foreach ($filesToCheck as $file) {
            if ($request->hasFile($file) && $officeSetting->$file) {
                $this->deleteFile($officeSetting->$file);
            }
        }
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
