"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { Textarea } from "@/components/ui/textarea" // ✅ Correct import

import { PaymentMethod } from "@/types/admin/oneTimeSetting"

interface PaymentMethodProps {
    paymentMethod?: PaymentMethod // undefined for create
}

export default function PaymentMethodForm({ paymentMethod }: PaymentMethodProps) {
    const isEdit = !!paymentMethod

    const { data, setData, post, put, processing, errors } = useForm({
        payment_method_name: paymentMethod?.payment_method_name || "",
        payment_method_detail: paymentMethod?.payment_method_detail || "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isEdit) {
            put(route("payment-methods.update", paymentMethod!.id))
        } else {
            post(route("payment-methods.store"))
        }
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Payment Methods", href: route("payment-methods.index") },
        {
            title: isEdit ? "Edit" : "Create",
            href: isEdit
                ? route("payment-methods.edit", paymentMethod?.id)
                : route("payment-methods.create"),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? `Edit Payment Method - ${paymentMethod?.payment_method_name}` : "Create Payment Method"} />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            {isEdit ? "Edit Payment Method " : "Create New Payment Method"}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Group Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="payment_method_name">
                                        Payment Method Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="payment_method_name"
                                        value={data.payment_method_name}
                                        onChange={(e) => setData("payment_method_name", e.target.value)}
                                    />
                                    {errors.payment_method_name && (
                                        <p className="text-sm text-red-500">{errors.payment_method_name}</p>
                                    )}
                                </div>

                                {/* Group Detail */}
                                <div className="space-y-2">
                                    <Label htmlFor="payment_method_detail">
                                        Payment Method Detail
                                    </Label>
                                    <Textarea
                                        id="payment_method_detail"
                                        value={data.payment_method_detail}
                                        onChange={(e) => setData("payment_method_detail", e.target.value)}
                                        placeholder="Short description about the group"
                                        rows={4}
                                    />
                                    {errors.payment_method_detail && (
                                        <p className="text-sm text-red-500">{errors.payment_method_detail}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <Button type="submit" disabled={processing}>
                                    {isEdit ? "Update Payment Method" : "Create Payment Method"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
