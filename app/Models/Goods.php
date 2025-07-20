<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Goods extends Model
{
    use HasFactory, SoftDeletes;


    protected $with = ['goodsGroup'];

    protected $fillable = [
        'goods_group_id',
        'goods_name',
        'model_no',
        'owner',
        'detail',
    ];

    public function goodsGroup()
    {
        return $this->belongsTo(GoodsGroup::class);
    }
}
