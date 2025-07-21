"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Shift", href: route("shifts.index") },
    { title: "Create", href: route("shifts.create") },
]

export default function ShiftCreate() {
    const { data, setData, post, processing, errors } = useForm({
        shift_name: "",
        shift_detail: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route("shifts.store"))


    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Shift" />


            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Create New Shift</CardTitle>

                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="shift_name">
                                        Shift Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="shift_name"
                                        value={data.shift_name}
                                        onChange={(e) => setData("shift_name", e.target.value)}
                                        
                                    />
                                    {errors.shift_name && (
                                        <p className="text-sm text-red-500">{errors.shift_name}</p>
                                    )}
                                </div>


                                {/* Description Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Shift Detail
                                    </Label>
                                    <Textarea
                                        id="shift_detail"
                                        value={data.shift_detail}
                                        onChange={(e) => setData("shift_detail", e.target.value)}
                                        placeholder="Short description about the group"
                                        rows={4}
                                    />
                                    {errors.shift_detail && (
                                        <p className="text-sm text-red-500">{errors.shift_detail}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button type="submit" disabled={processing}>
                                    Create Shift
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
