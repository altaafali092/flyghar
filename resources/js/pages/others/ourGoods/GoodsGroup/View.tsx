"use client"

import { Head, usePage } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"
import { GoodsGroup } from "@/types/admin/goodsgroup"

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Goods Groups", href: route("goods-group.index") },
    { title: "View", href: "#" },
]
interface GoodsGroupProps {
    goodsGroup: GoodsGroup
}


export default function GoodsGroupView({ goodsGroup }: GoodsGroupProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Goods Group" />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Goods Group Details</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <p className="text-base font-medium text-muted-foreground">
                                    {goodsGroup.name}
                                </p>
                            </div>

                            {/* Description Field */}
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <p className="text-base text-muted-foreground">
                                    {goodsGroup.description || "—"}
                                </p>
                            </div>

                            {/* Status Field */}
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <p className={`text-sm font-medium ${goodsGroup.is_active ? "text-green-600" : "text-red-600"}`}>
                                    {goodsGroup.is_active ? "Active" : "Inactive"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
