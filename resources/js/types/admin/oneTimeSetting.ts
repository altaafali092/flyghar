export interface FeePackage {
    id: number
    package_name: string
    package_type: string
    package_amount: number
    remark: string
    is_active: boolean
    created_at: string
}

export interface Shift {
    id: number
    shift_name: string
    shift_detail: string
    is_active: boolean
    created_at: string
}

export interface Ward {
    id: number
    ward_name: string
    is_active: boolean
    created_at: string
}
