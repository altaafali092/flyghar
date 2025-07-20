<?php

namespace App\Http\Requests\Goods;

use Illuminate\Foundation\Http\FormRequest;

class StoreGoodsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
             'goods_group_id'=>['required','exists:goods_groups,id'],
             'goods_name'=>['required','string','max:255'],
             'model_no'=>['required','string'],
             'owner'=>['required','string'],
             'detail'=>['nullable','string'],
            
        ];
    }
}
