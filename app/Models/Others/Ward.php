<?php

namespace App\Models\Others;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    use HasFactory;
    protected $fillable = [
        'ward_name',
        'is_active',
    ];
    protected $casts = [
        'is_active' => 'boolean',
    ];
}
