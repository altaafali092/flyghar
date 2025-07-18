"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { GoodsGroup } from "@/types/admin/goodsgroup"

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Goods Groups", href: route("goods-group.index") },
    { title: "Edit", href: '#' },
]
interface  goodsGroupProps  {
    goodsGroup: GoodsGroup
}

export default function GoodsGroupEdit({goodsGroup}:goodsGroupProps) {

    const { data, setData, post, processing, errors } = useForm({
        name: goodsGroup.name,
        description: goodsGroup.description,
        status: goodsGroup.is_active,
        _method:"PUT"
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route("goods-group.update",goodsGroup.id))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Goods Group" />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold"> Update Goods Group</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="e.g., Electronics"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                {/* Description Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description 
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        placeholder="Short description about the group"
                                        rows={4}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button type="submit" disabled={processing}>
                                    Update Goods Group
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
