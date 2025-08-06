<?php

namespace App\Models\Others;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubLedgerHead extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ledger_head_id',
        'sub_ledger_head_name',
        'sub_ledger_head_code',
        'remark',
        'is_active',
    ];


    public function ledgerHead(): BelongsTo
    {
        return $this->belongsTo(LedgerHead::class);
    }

    public function openingBalances(): HasMany
    {
        return $this->hasMany(OpeningBalance::class);
    }
}
