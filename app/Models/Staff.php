<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $fillable = [
        'image',
        'name',
        'gender',
        'date_of_birth',
        'phone',
        'email',
        'address',
        'position',
        'remarks',
    ];
}
