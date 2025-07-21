"use client"

import { useState } from "react"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/pagination"
import AppLayout from "@/layouts/app-layout"
import useFlashToast from "@/components/useFlashToast"
import { BreadcrumbItem } from "@/types"
import { PaginatedResponse } from "@/types/admin/pagination"
import { PaymentMethod } from "@/types/admin/oneTimeSetting"
import { Switch } from "@/components/ui/switch"


interface PaymentMethodProps {
    paymentMethods: PaginatedResponse<PaymentMethod>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Payment Methods",
        href: route("payment-methods.index"),
    },
]

export default function GroupIndex() {
    const { paymentMethods } = usePage<{ paymentMethods: PaymentMethodProps }>().props

    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredPaymentMethods = paymentMethods.data.filter((paymentMethod) =>
        paymentMethod.payment_method_name.toLowerCase().includes(search.toLowerCase())
    )

    const toggleStatus = (id: number) => {
        router.get(route('payment-methods.updateStatus', id), {}, {

            preserveScroll: true,
        })
    }


    const deletePaymentMethod = (paymentMethod: PaymentMethod) => {
        if (!window.confirm("Are you sure you want to delete this shift?")) return
        router.delete(route("payment-methods.destroy", paymentMethod.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment Method List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Payment Method List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search Payment Methods..."
                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route("payment-methods.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead>Detail</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredPaymentMethods.length > 0 ? (
                                    filteredPaymentMethods.map((paymentMethod, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{paymentMethod.payment_method_name}</TableCell>
                                            <TableCell>{paymentMethod.payment_method_detail}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={paymentMethod.is_active}
                                                        onCheckedChange={() => toggleStatus(paymentMethod.id)}
                                                    />
                                                    <span className={`text-sm font-medium ${paymentMethod.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                                        {paymentMethod.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route("payment-methods.show", paymentMethod.id)}>
                                                    <Button size="icon" variant="outline"><Eye className="w-4 h-4" /></Button>
                                                </Link>
                                                <Link href={route("payment-methods.edit", paymentMethod.id)}>
                                                    <Button size="icon" variant="outline"><Pencil className="w-4 h-4" /></Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deletePaymentMethod(paymentMethod)}
                                                    variant="outline"
                                                    size="icon"
                                                    className="hover:bg-red-400"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                                            No shifts found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>

                        <Pagination links={paymentMethods.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
