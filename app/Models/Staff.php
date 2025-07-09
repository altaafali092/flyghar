<?php

namespace App\Models;

use App\Traits\FileTrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use FileTrait;
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
    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function image(): Attribute
    {
        return $this->castingFile(defaultPath: 'staffImages');
    }
}
