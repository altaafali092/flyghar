"use client"

import { Head, usePage } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"
import { Goods, GoodsGroup } from "@/types/admin/goodsgroup"

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Goods Groups", href: route("goods-group.index") },
    { title: "View", href: "#" },
]
interface GoodsViewProps {
    good: Goods
}


export default function GoodsGroupView({ good }: GoodsViewProps) {
    console.log(good)

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
                                <Label>Goods Group</Label>
                                <p className="text-base font-medium text-muted-foreground">
                                   {good.goods_group?.name ?? "—"}

                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <p className="text-base font-medium text-muted-foreground">
                                    {good.goods_name}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label>Model No.</Label>
                                <p className="text-base font-medium text-muted-foreground">
                                    {good.model_no}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label>Owner</Label>
                                <p className="text-base font-medium text-muted-foreground">
                                    {good.owner}
                                </p>
                            </div>

                            {/* Description Field */}
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <p className="text-base text-muted-foreground">
                                    {good.detail || "—"}
                                </p>
                            </div>

                            
                           
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
