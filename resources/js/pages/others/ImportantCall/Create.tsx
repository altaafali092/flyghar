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


interface GroupTypeProps {

    groupTypes: Record<string, string>
}

export default function GoodsCreate() {

    const { groupTypes } = usePage<{ props: { groupTypes: GroupTypeProps[] } }>().props;

    const { data, setData, post, processing, errors } = useForm({

        group_type: '',
        name: '',
        email: '',
        phone: '',
        details: '',
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
                                {/* <div className="space-y-2">
                                    <Label htmlFor="group_type">
                                    Group Type <span className="text-red-500">*</span>
                                    </Label>
                                    <select
                                        id="group_type"
                                        className="w-full border border-input rounded-md p-2"
                                        value={data.group_type}
                                        onChange={(e) => setData("group_type", e.target.value)}
                                    >
                                        <option value="">Select Goods Group</option>
                                        {groupTypes.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.group_type && (
                                        <p className="text-sm text-red-500">{errors.group_type}</p>
                                    )}
                                </div> */}

                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="e.g.,Ram "
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name}</p>
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
                                    <Label htmlFor="details">
                                        Details
                                    </Label>
                                    <Textarea
                                        id="details"
                                        value={data.details}
                                        onChange={(e) => setData("details", e.target.value)}
                                        placeholder="Short detail about the goods"
                                        rows={5}
                                    />
                                    {errors.details && (
                                        <p className="text-sm text-red-500">{errors.details}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button type="submit" disabled={processing}>
                                    Create Contact
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
