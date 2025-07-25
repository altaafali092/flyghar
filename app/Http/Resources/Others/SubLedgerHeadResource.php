<?php

namespace App\Http\Resources\Others;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubLedgerHeadResource extends JsonResource
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
            'ledger_head_id' => new LedgerHeadResource($this->ledgerHead),
            'sub_ledger_head_name' => $this->sub_ledger_head_name,
            'sub_ledger_head_code' => $this->sub_ledger_head_code,
            'remark' => $this->remark,
            'is_active' => $this->is_active,
            
        ];
    }
}
