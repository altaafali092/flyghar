<?php

namespace App\Models\GeneralSeetting;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FiscalYear extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'fiscal_year',
        'status',
    ];
    protected $casts = [
        'status' => 'boolean'
    ];
}
