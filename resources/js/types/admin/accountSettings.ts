export interface MainHead {
    id: number
    account_group: string
    main_head_name: string
    remark: string
    status: boolean
}

export interface LedgerHead {
    id: number
    main_head_id: MainHead | null
    ledger_head_name: string
    remark: string
    status: boolean

}
export interface SubLedgerHead {
    id: number
    ledger_head_id: LedgerHead | null
    sub_ledger_head_name: string
    sub_ledger_head_code: string
    remark: string
    status: boolean

}