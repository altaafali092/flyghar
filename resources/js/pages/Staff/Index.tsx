"use client"

import { useState } from "react"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { Staff } from "@/types/admin/Staff"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/pagination"

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from "@/types"

interface StaffProps {
    staffs: {
        data: Staff[]
        current_page: number
        last_page: number
        links: {
            url: string | null
            label: string
            active: boolean
        }[]
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Staff',
        href: route('staff.index'),
    },
]

export default function StaffIndex() {
    const { staffs } = usePage<{ props: StaffProps }>().props
    const [search, setSearch] = useState("")


    const filtered = staffs.data.filter(staff =>
        staff.name.toLowerCase().includes(search.toLowerCase()) ||
        staff.email.toLowerCase().includes(search.toLowerCase()) ||
        staff.position.toLowerCase().includes(search.toLowerCase())
    )

    const deleteStaff = (staff: Staff) => {
        if (!window.confirm('Are you sure you want to delete this staff?')) {
            return;
        }
        router.delete(route('staff.destroy', staff.id), {
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staff List" />
            <div className=" p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">

                    <CardHeader>
                        <CardTitle>Staff List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search staff..."
                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href="/staff/create">
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filtered.length > 0 ? (
                                    filtered.map((staff, index) => (
                                        <TableRow key={staff.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <img src={staff.image} alt="" className="h-16 w-16 rounded-full" />
                                            </TableCell>
                                            <TableCell>{staff.name}</TableCell>
                                            <TableCell>{staff.email}</TableCell>
                                            <TableCell>{staff.position}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route('staff.show', staff.id)}>
                                                    <Button size="icon" variant="outline">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('staff.edit', staff.id)}>
                                                    <Button size="icon" variant="outline">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={(e) => deleteStaff(staff)}
                                                    variant="outline"
                                                    size="icon"
                                                    className="hover:bg-red-400"
                                                >
                                                    <Trash2 className='h-4 w-4' />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                                            No staff found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <Pagination links={staffs.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
