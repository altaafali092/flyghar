export interface MainHead{
    id: number
    account_group: string
    main_head_name: string
    remark: string
    status: boolean
}

export interface LedgerHead{
    id: number
   main_head_id: MainHead | null
    ledger_head_name: string
    remark: string
    status: boolean
   
}