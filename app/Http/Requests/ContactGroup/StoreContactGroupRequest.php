<?php

namespace App\Http\Requests\ContactGroup;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactGroupRequest extends FormRequest
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
            'contact_name' => ['required','string','max:255'],
            'contact_detail' => ['nullable','string'],
        ];
    }
}
