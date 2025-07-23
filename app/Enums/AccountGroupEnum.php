<?php

namespace App\Enums;

enum AccountGroupEnum: string
{
    case AssetsAndProperties = 'Assets And Properties';
    case CapitalAndLiabilities = 'Capital And Liabilities';
    case Expenditure = 'Expenditure';
    case Revenue = 'Revenue';
    
    public static function labels()
    {
        return[
            self::AssetsAndProperties->value => __('Assets And Properties'),
            self::CapitalAndLiabilities->value => __('Capital And Liabilities'),
            self::Expenditure->value => __('Expenditure'),
            self::Revenue->value => __('Revenue'),
        ];
    }
}
