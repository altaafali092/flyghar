<?php

namespace App\Http\Requests\OpeningBalance;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOpeningBalanceRequest extends FormRequest
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
            'rows' => ['required', 'array', 'min:1'],
            'rows.*.sub_ledger_head_id' => ['required', 'exists:sub_ledger_heads,id'],
            'rows.*.debit' => ['nullable', 'numeric', 'min:0', 'required_without:rows.*.credit'],
            'rows.*.credit' => ['nullable', 'numeric', 'min:0', 'required_without:rows.*.debit'],
        ];
    }
}
