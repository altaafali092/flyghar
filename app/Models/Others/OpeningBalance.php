<?php

namespace App\Models\Others;

use App\Models\User;
use App\Traits\FileTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OpeningBalance extends Model
{
    use HasFactory, SoftDeletes, FileTrait;
    protected $fillable = [
        'fiscal_year',
        'voucher_no',
        'image',
        'sub_ledger_head_id',
        'debit',
        'credit',
        'created_by',
        'is_active',
    ];
    protected $casts = [
        'is_active' => 'boolean'
    ];



    public function subLedgerHead(): BelongsTo
    {
        return $this->belongsTo(SubLedgerHead::class);
    }
    public function createdBy()
    {
        return $this->hasOne(User::class, 'id', 'created_by');
    }
}
