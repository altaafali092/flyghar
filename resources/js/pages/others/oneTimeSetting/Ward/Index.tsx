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
import { Ward } from "@/types/admin/oneTimeSetting"
import { Switch } from "@/components/ui/switch"


interface WardProps {
    wards: PaginatedResponse<Ward>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Wards",
        href: route("wards.index"),
    },
]

export default function GroupIndex() {
    const { wards } = usePage<{ wards: WardProps }>().props

    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredWards = wards.data.filter((ward) =>
        ward.ward_name.toLowerCase().includes(search.toLowerCase())



    )

    const toggleStatus = (id: number) => {
        router.get(route('wards.updateStatus', id), {}, {
            preserveScroll: true,
        })
    }



    const deleteWard = (ward: Ward) => {
        if (!window.confirm("Are you sure you want to delete this shift?")) return
        router.delete(route("wards.destroy", ward.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Wards List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Wards List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search wards..."


                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route("wards.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Ward English</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredWards.length > 0 ? (
                                    filteredWards.map((ward, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{ward.ward_name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={ward.is_active}
                                                        onCheckedChange={() => toggleStatus(ward.id)}
                                                    />
                                                    <span className={`text-sm font-medium ${ward.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                                        {ward.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                
                                                <Link href={route("wards.edit", ward.id)}>
                                                    <Button size="icon" variant="outline"><Pencil className="w-4 h-4" /></Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteWard(ward)}
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

                        <Pagination links={wards.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
