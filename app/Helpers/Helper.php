<?php

namespace App\Helpers;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class Helper
{

    // public static function getMainSetting()
    // {
    //     return Cache::get('main_setting', function (){
    //         return Setting::latest()->first();
    //     });
    // }

    public function deleteFile($filePath, $disk = 'public')
    {
        if (Storage::disk($disk)->exists($filePath)) {
            Storage::disk($disk)->delete($filePath);
        }
    }




    public static function isUrl($link)
    {
        return filter_var($link, FILTER_VALIDATE_URL);
    }
}
if (!function_exists('deleteFile')) {
    function deleteFile(string $filePath): void
    {
        if (Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);
        }
    }


    if (!function_exists('checkFileExists')) {
        function checkFileExists(array $requestFile, array $dataToCheck): array
        {
            $requestFile = Arr::dot($requestFile);
            $dataToCheck = Arr::dot($dataToCheck);

            foreach ($dataToCheck as $key => $value) {
                if (array_key_exists($key, $requestFile) && $requestFile[$key] === null) {
                    unset($requestFile[$key]);
                }
            }

            return Arr::undot($requestFile);
        }
    }
}
