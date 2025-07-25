<?php

namespace App\Http\Requests\SubLedgerHead;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubLedgerHeadRequest extends FormRequest
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
            'ledger_head_id' => ['required', 'exists:ledger_heads,id'],
            'sub_ledger_head_name' => ['required', 'string', 'max:255'],
            'remark' => ['nullable', 'string', 'max:255'],
        ];
    }
}
