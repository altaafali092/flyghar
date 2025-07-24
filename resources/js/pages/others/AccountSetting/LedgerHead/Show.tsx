"use client"

import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"

import { LedgerHead } from "@/types/admin/accountSettings"

interface LedgerHeadProps {
    ledgerHead: LedgerHead
}

const LedgerHeadShow = ({ ledgerHead }: LedgerHeadProps) => {
    // console.log(ledgerHead)

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Ledger Heads", href: route("ledger-heads.index") },
        { title: "Show", href: route("ledger-heads.show", ledgerHead.id) },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Ledger Head Details - ${ledgerHead.ledger_head_name}`} />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Ledger Head Details</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">

                            <div>
                                <p className="text-xs font-medium text-foreground">Account Group Name</p>
                                <p className="mt-1">{ledgerHead.main_head_id?.account_group ?? "-"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-foreground">Main Head Name</p>
                                <p className="mt-1">{ledgerHead?.main_head_id?.main_head_name ?? "-"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-foreground">Ledger Head Name</p>
                                <p className="mt-1">{ledgerHead.ledger_head_name ?? "-"}</p>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-foreground">Remark</p>
                                <p className="mt-1">{ledgerHead.remark ?? "-"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

export default LedgerHeadShow
