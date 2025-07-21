"use client"

import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { PaymentMethod } from "@/types/admin/oneTimeSetting"

interface PaymentMethodProps {
    paymentMethod: PaymentMethod
}

const PaymentMethodShow = ({ paymentMethod }: PaymentMethodProps) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Payment Methods", href: route("payment-methods.index") },
        { title: "Show", href: route("payment-methods.show", paymentMethod.id) },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Payment Method Details - ${paymentMethod.payment_method_name}`} />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Payment Method Details</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">

                            <div>
                                <p className="text-xs font-medium text-foreground">Payment Method Name</p>
                                <p className="mt-1">{paymentMethod.payment_method_name ?? "-"}</p>
                            </div>


                            <div>
                                <p className="text-xs font-medium text-foreground">Payment Method Detail</p>
                                <p className="mt-1">{paymentMethod.payment_method_detail ?? "-"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

export default PaymentMethodShow
