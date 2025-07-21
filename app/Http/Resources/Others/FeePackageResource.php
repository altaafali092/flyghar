<?php

namespace App\Http\Resources\Others;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeePackageResource extends JsonResource
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
            'package_name' => $this->package_name,
            'package_type' => $this->package_type,
            'package_amount' => $this->package_amount,
            'remark' => $this->remark,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
        ];
    }
}
