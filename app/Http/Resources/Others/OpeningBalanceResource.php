<?php

namespace App\Http\Resources\Others;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OpeningBalanceResource extends JsonResource
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
            'sub_ledger_head_id' => $this->sub_ledger_head_id,
            'fiscal_year'=>$this->fiscal_year,
            'image'=>$this->image,
            'credit' => $this->credit,
            'debit' => $this->debit,
            'remark' => $this->remark,
        ];
    }
}
