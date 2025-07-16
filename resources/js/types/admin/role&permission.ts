import { User } from ".."

export interface Permission {
    id: number
    name: string
    guard_name: string
    created_at: string
    updated_at: string
}
export interface Role {
    id: number
    name: string
    guard_name: string
    created_at: string
    updated_at: string
    permissions: Permission[]; 
}
export interface RoleWithPermissions extends Role {
    permissions: Permission[] //
}
export interface RoleWithPermissionsAndUsers extends RoleWithPermissions {
    users: User[]
}
