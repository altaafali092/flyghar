"use client"

import { Head, useForm, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { GoodsGroup } from "@/types/admin/goodsgroup"

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Goods", href: route("goods.index") },
    { title: "Create", href: route("goods.create") },
]

export default function GoodsCreate() {

    const { goodsGroups } = usePage<{ props: { goodsGroups: GoodsGroup[] } }>().props;

    const { data, setData, post, processing, errors } = useForm({
        goods_group_id: "",
        goods_name: "",
        model_no: "",
        owner: "",
        detail: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route("goods.store"))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Goods Group" />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Create New Goods</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                {/* Goods Group Dropdown */}
                                <div className="space-y-2">
                                    <Label htmlFor="goods_group_id">
                                        Goods Group <span className="text-red-500">*</span>
                                    </Label>
                                    <select
                                        id="goods_group_id"
                                        className="w-full border border-input rounded-md p-2"
                                        value={data.goods_group_id}
                                        onChange={(e) => setData("goods_group_id", e.target.value)}
                                    >
                                        <option value="">Select Goods Group</option>
                                        {goodsGroups.map((group) => (
                                            <option key={group.id} value={group.id}>
                                                {group.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.goods_group_id && (
                                        <p className="text-sm text-red-500">{errors.goods_group_id}</p>
                                    )}
                                </div>

                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.goods_name}
                                        onChange={(e) => setData("goods_name", e.target.value)}
                                        placeholder="e.g., Electronics"
                                    />
                                    {errors.goods_name && (
                                        <p className="text-sm text-red-500">{errors.goods_name}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Model No. <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="model_no"
                                        value={data.model_no}
                                        onChange={(e) => setData("model_no", e.target.value)}
                                        placeholder="e.g., 123456"
                                    />
                                    {errors.model_no && (
                                        <p className="text-sm text-red-500">{errors.model_no}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Owner <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.owner}
                                        onChange={(e) => setData("owner", e.target.value)}
                                        
                                    />
                                    {errors.owner && (
                                        <p className="text-sm text-red-500">{errors.owner}</p>
                                    )}
                                </div>

                                {/* Description Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="detail">
                                        Details
                                    </Label>
                                    <Textarea
                                        id="detail"
                                        value={data.detail}
                                        onChange={(e) => setData("detail", e.target.value)}
                                        placeholder="Short detail about the goods"
                                        rows={5}
                                    />
                                    {errors.detail && (
                                        <p className="text-sm text-red-500">{errors.detail}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button type="submit" disabled={processing}>
                                    Create Goods
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
