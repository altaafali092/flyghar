<?php

namespace App\Enums;

/**
 * Enum representing different types of groups in the system.
 */
enum GroupTypeEnum: string
{
    case SupportTeam = 'supportteam';
    case Emergency = 'emergency';
    case Others = 'others';


    public static function labels()
    {
        return[
            self::SupportTeam->value => __('Support Team'),
            self::Emergency->value => __('Emergency'),
            self::Others->value => __('Others'),
        ];
    }
}
