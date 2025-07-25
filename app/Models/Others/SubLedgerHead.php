<?php

namespace App\Models\Others;

use Illuminate\Database\Eloquent\Model;

class SubLedgerHead extends Model
{
    

    protected $fillable = [
        'ledger_head_id',
        'sub_ledger_head_name',
        'sub_ledger_head_code',
        'remark',
        'is_active',
    ];

    public function ledgerHead():hasMany
    {
        return $this->hasMany(LedgerHead::class);
    }
}
