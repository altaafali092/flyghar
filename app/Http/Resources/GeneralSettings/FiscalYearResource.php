<?php

namespace App\Http\Resources\GeneralSettings;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FiscalYearResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'fiscal_year'=>$this->fiscal_year,
            'status'=>$this->status,
        ];
    }
}
