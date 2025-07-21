<?php

namespace App\Models\Others;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentMethod extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'payment_method_name',
        'payment_method_detail',
        'is_active',
    ];
    protected $casts = [
        'is_active' => 'boolean',
    ];
}
