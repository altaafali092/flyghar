<?php

namespace App\Models\GeneralSetting;

use App\Traits\FileTrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OfficeSetting extends Model
{
    use HasFactory, SoftDeletes,FileTrait;

    protected $fillable = [
        'fiscal_year_id',
        'office_name',
        'office_address',
        'office_image',
        'office_cover',
        'office_phone',
        'office_gmail',
        'fb_url',
        'insta_url',
        'youtube_url',
    ];


    public function officeImage(): Attribute
    {
        return $this->castingFile(defaultPath: 'office/officeImage');
    }

    public function officeCover(): Attribute
    {
        return $this->castingfile(defaultPath: 'office/coverImage');
    }

    public function fiscalYear(): BelongsTo
    {
        return  $this->belongsTo(FiscalYear::class);
    }
}
