"use client"

import { Head, usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem, PageProps } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Fee Packages", href: route("fee-packages.index") },
    { title: "View", href: "#" },
]

export default function FeePackageShow() {
    const { props } = usePage<PageProps>()
    const feePackage = props.feePackage

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fee Package Detail" />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Fee Package Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-1">
                                <div className="text-muted-foreground font-medium">Package Name</div>
                                <div className="text-foreground">{feePackage.package_name}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-muted-foreground font-medium">Package Type</div>
                                <div className="text-foreground">{feePackage.package_type}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-muted-foreground font-medium">Package Amount</div>
                                <div className="text-foreground">{feePackage.package_amount}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-muted-foreground font-medium">Remarks</div>
                                <div className="text-foreground">{feePackage.remark || "—"}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-muted-foreground font-medium">created At</div>
                                <div className="text-foreground">{new Date(feePackage.created_at).toLocaleString()}</div>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-1">
            <div className="text-muted-foreground font-medium">{label}</div>
            <div className="text-foreground">{value}</div>
        </div>
    )
}
