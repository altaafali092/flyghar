"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { Textarea } from "@/components/ui/textarea"
import { MainHead } from "@/types/admin/accountSettings"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MainHeadProps {
    mainHead?: MainHead
    accountGroups: Record<string, string>
}

export default function MainHeadForm({ mainHead, accountGroups }: MainHeadProps) {
    const isEdit = !!mainHead

    const { data, setData, post, put, processing, errors } = useForm({
        account_group: mainHead?.account_group || "",
        main_head_name: mainHead?.main_head_name || "",
        remark: mainHead?.remark || "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isEdit) {
            put(route("main-heads.update", mainHead!.id))
        } else {
            post(route("main-heads.store"))
        }
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Main Heads", href: route("main-heads.index") },
        {
            title: isEdit ? "Edit" : "Create",
            href: isEdit
                ? route("main-heads.edit", mainHead?.id)
                : route("main-heads.create"),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? `Edit Main Head - ${mainHead?.main_head_name}` : "Create Main Head"} />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            {isEdit ? "Edit Main Head" : "Create New Main Head"}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="account_group">
                                        Account Group <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.account_group}
                                        onValueChange={(value) => setData("account_group", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an account group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(accountGroups).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.account_group && (
                                        <p className="text-sm text-red-500">{errors.account_group}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="main_head_name">
                                        Main Head Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="main_head_name"
                                        value={data.main_head_name}
                                        onChange={(e) => setData("main_head_name", e.target.value)}
                                    />
                                    {errors.main_head_name && (
                                        <p className="text-sm text-red-500">{errors.main_head_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="remark">
                                        Remark
                                    </Label>
                                    <Textarea
                                        id="remark"
                                        value={data.remark}
                                        onChange={(e) => setData("remark", e.target.value)}
                                        placeholder="Short description about the main head"
                                        rows={4}
                                    />
                                    {errors.remark && (
                                        <p className="text-sm text-red-500">{errors.remark}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <Button type="submit" disabled={processing}>
                                    {isEdit ? "Update Main Head" : "Create Main Head"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
