<?php

namespace Database\Seeders;

use App\Traits\ExecuteSql;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddressSeeder extends Seeder
{
    
    use ExecuteSql;

    public function run()
    {
        $this->executeSqlFile(storage_path('sql/Address/address.sql'));
    }
    
}
