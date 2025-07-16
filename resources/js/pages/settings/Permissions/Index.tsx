

import { useEffect, useState } from "react"
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
import { Permission } from "@/types/admin/role&permission"
import toast from "react-hot-toast"
import useFlashToast from "@/components/useFlashToast"

interface PermissionProps {
    permissions: {
        data: Permission[]
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
        title: 'Permission',
        href: route('permission.index'),
    },
]

export default function Index() {
    const { permissions } = usePage<{ permissions: PermissionProps }>().props
    useFlashToast()
    const [search, setSearch] = useState("")

    const filtered = permissions.data.filter((permission: Permission) =>
        permission.name?.toLowerCase().includes(search.toLowerCase())
    )


    const deletePermission = (permission: Permission) => {
        if (!window.confirm('Are you sure you want to delete this permission?')) {
            return;
        }
        router.delete(route('permission.destroy', permission.id), {
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permission List" />
            <div className=" p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">

                    <CardHeader>
                        <CardTitle>Permission List</CardTitle>
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
                            <Link href={route('permission.create')}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>

                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filtered.length > 0 ? (
                                    filtered.map((permission, index) => (
                                        <TableRow key={permission.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{permission.name}</TableCell>
                                            <TableCell className="text-right space-x-2">

                                                <Link href={route('permission.edit', permission.id)}>
                                                    <Button size="icon" variant="outline">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={(e) => deletePermission(permission)}
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

                        <Pagination links={permissions.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
