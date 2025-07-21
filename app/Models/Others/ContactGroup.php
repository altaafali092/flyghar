<?php

namespace App\Models\Others;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactGroup extends Model
{
    use HasFactory; 
    protected $fillable=[
        'contact_name',
        'contact_detail',
        'is_active',
    ];
    protected $casts=[
        'is_active'=>'boolean',
    ];
    // public function importantContacts(){
    //     return $this->hasMany(Contact::class);
    // }
}
