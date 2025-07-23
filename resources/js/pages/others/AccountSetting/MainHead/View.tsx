"use client"

import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"

import { MainHead } from "@/types/admin/accountSettings"

interface MainHeadProps {
    mainHead: MainHead
}

const MainHeadShow = ({ mainHead }: MainHeadProps) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Main Heads", href: route("main-heads.index") },
        { title: "Show", href: route("main-heads.show", mainHead.id) },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Main Head Details - ${mainHead.main_head_name}`} />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Main Head Details</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">

                            <div>
                                <p className="text-xs font-medium text-foreground">Main Head Name</p>
                                <p className="mt-1">{mainHead.account_group ?? "-"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-foreground">Main Head Name</p>
                                <p className="mt-1">{mainHead.main_head_name ?? "-"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-foreground">Remark</p>
                                <p className="mt-1">{mainHead.remark ?? "-"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

export default MainHeadShow
