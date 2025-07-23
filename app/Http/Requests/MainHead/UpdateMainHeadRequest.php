<?php

namespace App\Http\Requests\MainHead;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMainHeadRequest extends FormRequest
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
            'account_group' => ['required', 'string'],
            'main_head_name' => ['required', 'string'],
            'remark' => ['nullable', 'string'],
        ];
    }
}
