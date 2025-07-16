"use client"

import { Head, useForm, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { Permission, Role } from "@/types/admin/role&permission"

interface PageProps {
    role: Role
    permissions: Permission[]
    hasPermissions: string[]
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Roles", href: route("role.index") },
    { title: "Edit", href: "#" },
]

export default function EditRole() {
    const { role, permissions, hasPermissions } = usePage<PageProps>().props

    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permission: hasPermissions,
    })

    const handleCheckboxChange = (permissionName: string) => {
        if (data.permission.includes(permissionName)) {
            setData("permission", data.permission.filter(p => p !== permissionName))
        } else {
            setData("permission", [...data.permission, permissionName])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route("role.update", role.id))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Role" />

            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Edit Role</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="Enter role name"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                            </div>

                            <div>
                                <Label>Permissions <span className="text-red-500">*</span></Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                    {permissions.map((permission) => (
                                        <label key={permission.id} className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                value={permission.name}
                                                checked={data.permission.includes(permission.name)}
                                                onChange={() => handleCheckboxChange(permission.name)}
                                                className="accent-blue-600"
                                            />
                                            {permission.name}
                                        </label>
                                    ))}
                                </div>
                                {errors.permission && (
                                    <p className="text-sm text-red-500">{errors.permission}</p>
                                )}
                            </div>

                            <div className="flex justify-start">
                                <Button type="submit" disabled={processing}>
                                    Update Role
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
