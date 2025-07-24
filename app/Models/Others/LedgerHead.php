<?php

namespace App\Models\Others;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LedgerHead extends Model
{
    use HasFactory, SoftDeletes;

     protected $with = ['mainHead'];

    protected $fillable = [
        'main_head_id',
        'ledger_head_name',
        'remark',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function mainHead()
    {
        return $this->belongsTo(MainHead::class,);
    }
}
