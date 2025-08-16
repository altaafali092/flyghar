<?php

namespace App\Models\Others;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImpContact extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'group_type',
         'name',
        'email',
        'phone',
        'is_active',
        'details',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

}
