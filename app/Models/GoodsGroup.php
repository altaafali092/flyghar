<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class GoodsGroup extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'name',
        'description',
        'is_active',
    ];
    protected $casts = [
        'is_active' => 'boolean',
    ];
    
    public function goods():HasMany
    {
        return $this->hasMany(Goods::class);
    }
}
