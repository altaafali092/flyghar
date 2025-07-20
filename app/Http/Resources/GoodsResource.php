<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GoodsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'goods_group_id' => $this->goods_group_id,
            'goods_name' => $this->goods_name,
            'model_no' => $this->model_no,
            'owner' => $this->owner,
            'detail' => $this->detail,
            'goodsGroup' => new GoodsGroupResource($this->goodsGroup),

        ];
    }
}
