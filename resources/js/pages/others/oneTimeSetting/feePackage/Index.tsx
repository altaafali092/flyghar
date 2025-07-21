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
import { Goods } from "@/types/admin/goodsgroup"
import { PaginatedResponse } from "@/types/admin/pagination"
import { FeePackage } from "@/types/admin/oneTimeSetting"
import { Switch } from "@/components/ui/switch"

interface GoodsProps {
    feePackages: PaginatedResponse<FeePackage>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Fee Packages",
        href: route("fee-packages.index"),
    },
]

export default function GroupIndex() {
    const { feePackages } = usePage<{ feePackages: GoodsProps }>().props

    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredfeePackages = feePackages.data.filter((feePackage) =>
        feePackage.package_name.toLowerCase().includes(search.toLowerCase()) ||
        feePackage.package_type.toLowerCase().includes(search.toLowerCase()) ||
        feePackage.remark.toLowerCase().includes(search.toLowerCase()) ||
        feePackage.created_at.toLowerCase().includes(search.toLowerCase())

    )

    const toggleStatus = (id: number) => {
        router.get(route('fee-packages.updateStatus', id), {}, {
            preserveScroll: true,
        })
    }


    const deleteFeePackage = (feePackage: FeePackage) => {
        if (!window.confirm("Are you sure you want to delete this goods?")) return
        router.delete(route("fee-packages.destroy", feePackage.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fee Packages List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Fee Pakages List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search fee packages..."

                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route("fee-packages.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Package Name</TableHead>
                                    <TableHead>Package Type</TableHead>
                                    <TableHead>Package Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredfeePackages.length > 0 ? (
                                    filteredfeePackages.map((feePackage, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{feePackage.package_name}</TableCell>
                                            <TableCell>{feePackage.package_type}</TableCell>
                                            <TableCell>{feePackage.package_amount}</TableCell>
                                          
                                           

                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={feePackage.is_active}
                                                        onCheckedChange={() => toggleStatus(feePackage.id)}
                                                    />
                                                    <span className={`text-sm font-medium ${feePackage.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                                        {feePackage.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route("fee-packages.show", feePackage.id)}>
                                                    <Button size="icon" variant="outline">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route("fee-packages.edit", feePackage.id)}>


                                                    <Button size="icon" variant="outline">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteFeePackage(feePackage)}
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
                                            No goods found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <Pagination links={feePackages.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
