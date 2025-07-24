<?php

namespace App\Http\Resources\Others;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LedgerHeadResource extends JsonResource
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
            'main_head_id' => new MainHeadResource($this->mainHead),
            'ledger_head_name' => $this->ledger_head_name,
            'remark' => $this->remark,
            'status' => $this->status,
        ];
    }
}
