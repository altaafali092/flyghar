<?php

namespace App\Http\Requests\GeneralSettings\OfficeSetting;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOfficeSettingRequest extends FormRequest
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
            'fiscal_year_id'=>['required','exists:fiscal_years,id'],
            'office_name'=>['required','string'],
            'office_address'=>['required','string'],
            'office_image'=>['required','image','max:2048'],
            'office_cover'=>['nullable','string','max:2048'],
            'office_phone'=> ['nullable', 'string', 'regex:/^(98|97)\d{8}$/'],
            'office_gmail'=>['nullable','gmail'],
            'fb_url'=>['nullable','url'],
            'insta_url'=>['nullable','url'],
            'youtube_url'=>['nullable','url'],
        ];
    }
}
