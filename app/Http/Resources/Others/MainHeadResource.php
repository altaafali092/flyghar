<?php

namespace App\Http\Resources\Others;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MainHeadResource extends JsonResource
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
            'account_group'=>$this->account_group,
            'main_head_name'=>$this->main_head_name,
            'remark'=>$this->remark,
            'status'=>$this->status,
            
        ];
    }
}
