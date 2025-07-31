<?php

namespace App\Http\Resources\GeneralSettings;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfficeSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'office_setting_id' => new FiscalYearResource($this->fiscalYears),
            'office_name' => $this->office_name,
            'office_address' => $this->office_address,
            'office_image' => $this->office_image,
            'office_cover' => $this->office_cover,
            'office_phone' => $this->office_phone,
            'office_gmail' => $this->office_gmail,
            'fb_url' => $this->fb_url,
            'insta_url' => $this->insta_url,
            'youtube_url' => $this->youtube_url,
        ];
    }
}
