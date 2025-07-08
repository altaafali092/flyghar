<?php

namespace App\Http\Requests\StaffRequest;

use Illuminate\Foundation\Http\FormRequest;

class StoreStaffRequest extends FormRequest
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
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string', 'max:255'],
            'date_of_birth' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:staff,email'],
            'phone' => ['nullable', 'string', 'regex:/^(98|97)\d{8}$/'],
            'address' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'remark' => ['nullable', 'string'],
        ];
    }
}
