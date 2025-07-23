<?php

namespace App\Enums;

enum AccountGroupEnum: string
{
    case AssetsAndProperties = 'assets_and_properties';
    case CapitalAndLiabilities = 'capital_and_liabilities';
    case Expenditure = 'expenditure';
    case Revenue = 'revenue';
    
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
