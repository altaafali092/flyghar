<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdminRole = Role::updateOrCreate(['name' => 'superadmin']);

        $user = User::updateOrCreate(
            ['email' => 'admin@admin.com'], // only check by unique field
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password'),
            ]
        );


        $user->assignRole($superAdminRole);
        $permissions = Permission::all();
        // Assign all permissions to the superadmin role
        $superAdminRole->syncPermissions($permissions);
    }
}
