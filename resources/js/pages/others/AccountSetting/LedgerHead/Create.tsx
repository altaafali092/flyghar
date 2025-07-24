"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { Textarea } from "@/components/ui/textarea"
import { LedgerHead, MainHead } from "@/types/admin/accountSettings"

interface LedgerHeadFormProps {
    ledgerHead?: LedgerHead
    mainHeads: MainHead[]
}

export default function LedgerHeadForm({ ledgerHead, mainHeads }: LedgerHeadFormProps) {
    const isEdit = !!ledgerHead

    const { data, setData, post, put, processing, errors } = useForm({
        main_head_id: ledgerHead?.main_head_id || "",
        ledger_head_name: ledgerHead?.ledger_head_name || "",
        remark: ledgerHead?.remark || "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isEdit) {
            put(route("ledger-heads.update", ledgerHead!.id))
        } else {
            post(route("ledger-heads.store"))
        }
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Ledger Heads", href: route("ledger-heads.index") },
        {
            title: isEdit ? "Edit" : "Create",
            href: isEdit
                ? route("ledger-heads.edit", ledgerHead?.id)
                : route("ledger-heads.create"),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? `Edit Ledger Head - ${ledgerHead?.ledger_head_name}` : "Create Ledger Head"} />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            {isEdit ? "Edit Ledger Head" : "Create New Ledger Head"}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Main Head Select */}
                                <div className="space-y-2">
                                    <Label htmlFor="main_head_id">
                                        Main Account Head <span className="text-red-500">*</span>
                                    </Label>
                                    <select
                                        id="main_head_id"
                                        className="w-full border border-input rounded-md p-2"
                                        value={data.main_head_id}
                                        onChange={(e) => setData("main_head_id",e.target.value)} // parse to number if needed
                                    >
                                        <option value="">Select Main Account Head</option>
                                        {mainHeads.map((mainHead) => (
                                            <option key={mainHead.id} value={mainHead.id}>
                                                {mainHead.main_head_name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.main_head_id && (
                                        <p className="text-sm text-red-500">{errors.main_head_id}</p>
                                    )}
                                </div>

                                {/* Ledger Head Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="ledger_head_name">
                                        Account Ledger Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="ledger_head_name"
                                        value={data.ledger_head_name}
                                        onChange={(e) => setData("ledger_head_name", e.target.value)}
                                    />
                                    {errors.ledger_head_name && (
                                        <p className="text-sm text-red-500">{errors.ledger_head_name}</p>
                                    )}
                                </div>

                                {/* Remark */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="remark">Remark</Label>
                                    <Textarea
                                        id="remark"
                                        value={data.remark}
                                        onChange={(e) => setData("remark", e.target.value)}
                                        placeholder="Short description about the ledger head"
                                        rows={4}
                                    />
                                    {errors.remark && (
                                        <p className="text-sm text-red-500">{errors.remark}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button type="submit" disabled={processing}>
                                    {isEdit ? "Update Ledger Head" : "Create Ledger Head"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
