<?php

namespace App\Http\Requests\LedgerHead;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLedgerHeadRequest extends FormRequest
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
            'main_head_id' => ['required', 'exists:main_heads,id'],
            'ledger_head_name' => ['required', 'string'],
            'remark' => ['nullable', 'string'],
        ];
    }
}
