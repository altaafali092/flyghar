<?php

namespace App\Http\Resources\Others;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShiftResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
   

    public function toArray(Request $request): array
    {
        return[
            'id'=>$this->id,
            'shift_name'=>$this->shift_name,
            'shift_detail'=>$this->shift_detail,
            'is_active'=>$this->is_active,
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at,
            'deleted_at'=>$this->deleted_at,
        ];
    }
}
