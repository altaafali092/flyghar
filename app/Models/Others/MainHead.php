<?php

namespace App\Models\Others;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MainHead extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'account_group',
        'main_head_name',
        'remark',
        'status',
    ];
    protected $casts = [
        'status' => 'boolean',
    ];
    // public function subHeads()
    // {
    //     return $this->hasMany(SubHead::class);
    // }
}
