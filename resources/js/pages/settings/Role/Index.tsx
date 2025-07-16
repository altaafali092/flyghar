
import { useState } from "react"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/pagination"
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from "@/types"
import { Role } from "@/types/admin/role&permission"
import useFlashToast from "@/components/useFlashToast"

interface RoleIndexProps {
    roles: {
        data: Role[]
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
        title: 'Role',
        href: route('role.index'),
    },
]

export default function Index() {
    const { roles } = usePage<RoleIndexProps>().props
    useFlashToast()

    const [search, setSearch] = useState("")

    const filtered = roles.data.filter((role) =>
        role.name?.toLowerCase().includes(search.toLowerCase())
    )

    const deleteRole = (role: Role) => {
        if (!window.confirm('Are you sure you want to delete this role?')) {
            return
        }

        router.delete(route('role.destroy', role.id), {
            preserveScroll: true,
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Role List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search role..."
                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route('role.create')}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Permissions</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filtered.length > 0 ? (
                                    filtered.map((role, index) => (
                                        <TableRow key={role.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{role.name}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap">
                                                    {role.permissions?.map((permission) => (
                                                        <span
                                                            key={permission.id}
                                                            className="m-1 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                                                        >
                                                            {permission.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right space-x-2">
                                                <Link href={route('role.edit', role.id)}>
                                                    <Button size="icon" variant="outline">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteRole(role)}
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
                                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                                            No roles found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <Pagination links={roles.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
