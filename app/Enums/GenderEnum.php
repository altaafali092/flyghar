<?php

namespace App\Enums;

enum GenderEnum: string
{
    case Male = 'male';
    case Female = 'female';
    case Other = 'other';
    
    public static function labels()
    {
        return[
            self::Male->value => __('Male'),
            self::Female->value => __('Female'),
            self::Other->value => __('Other'),
        ];
    }
}




