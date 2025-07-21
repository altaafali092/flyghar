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
import { FeePackage, Shift } from "@/types/admin/oneTimeSetting"
import { Switch } from "@/components/ui/switch"

interface ShiftProps {
    shifts: PaginatedResponse<Shift>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Shifts",
        href: route("shifts.index"),
    },
]

export default function GroupIndex() {
    const { shifts } = usePage<{ shifts: ShiftProps }>().props

    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredShifts = shifts.data.filter((shift) =>
        shift.shift_name.toLowerCase().includes(search.toLowerCase()) ||
        shift.shift_detail.toLowerCase().includes(search.toLowerCase())


    )

    const toggleStatus = (id: number) => {
        router.get(route('shifts.updateStatus', id), {}, {
            preserveScroll: true,
        })
    }


    const deleteShift = (shift: Shift) => {
        if (!window.confirm("Are you sure you want to delete this shift?")) return
        router.delete(route("shifts.destroy", shift.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shifts List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Shifts List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search shifts..."


                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route("shifts.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Shift Name</TableHead>
                                    <TableHead>Shift Detail</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredShifts.length > 0 ? (
                                    filteredShifts.map((shift, index) => (
                                        <TableRow key={shift.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{shift.shift_name}</TableCell>
                                            <TableCell>{shift.shift_detail}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={shift.is_active}
                                                        onCheckedChange={() => toggleStatus(shift.id)}
                                                    />
                                                    <span className={`text-sm font-medium ${shift.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                                        {shift.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route("shifts.show", shift.id)}>
                                                    <Button size="icon" variant="outline"><Eye className="w-4 h-4" /></Button>
                                                </Link>
                                                <Link href={route("shifts.edit", shift.id)}>
                                                    <Button size="icon" variant="outline"><Pencil className="w-4 h-4" /></Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteShift(shift)}
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

                        <Pagination links={shifts.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
