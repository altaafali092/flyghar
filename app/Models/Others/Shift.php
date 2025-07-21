<?php

namespace App\Models\Others;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\HasDatabaseNotifications;

class Shift extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'shift_name',
        'shift_detail',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
