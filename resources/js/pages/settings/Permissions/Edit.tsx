"use client"

import { Head, useForm, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { permission } from "process"
import { Permission } from "@/types/admin/role&permission"

const breadcrumbs: BreadcrumbItem[] = [
    { title: "permission", href: route("permission.index") },
    { title: "Edit", href:'#' },
]



export default function permissionEdit() {
    const { permission } = usePage<{ permission: Permission }>().props

    const { data, setData, post, processing, errors } = useForm({
        name: permission.name || '',
        guard_name: permission.guard_name || 'web',
        _method: "PUT"
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        post(route('permission.update', permission.id))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create permission" />

            <div className=" p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Update permission</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name">Name  <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="Enter permission name"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>


                            </div>

                            <div className="flex justify-start">
                                <Button type="submit" disabled={processing}>
                                    Update permission
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
