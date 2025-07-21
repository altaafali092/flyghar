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
    { title: "Fee Packages", href: route("fee-packages.index") },
    { title: "Create", href: route("fee-packages.create") },
]
const PackageTypes = {
    regular: "Regular",
    Miscellaneous: "Miscellaneous",

}

export default function FeePackageCreate() {
    const { data, setData, post, processing, errors } = useForm({
        package_name: "",
        package_type: "",
        package_amount: "",
        remark: "",
        description: "",

    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route("fee-packages.store"))

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Fee Package" />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Create New Fee Package</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="package_name">
                                        Package Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="package_name"
                                        value={data.package_name}
                                        onChange={(e) => setData("package_name", e.target.value)}
                                        placeholder="e.g., Electronics"
                                    />
                                    {errors.package_name && (
                                        <p className="text-sm text-red-500">{errors.package_name}</p>
                                    )}
                                </div>


                                <div>
                                    <Label htmlFor="gender">
                                        Package  Type <span className="text-red-500">*</span>
                                    </Label>

                                    <Select
                                        value={data.package_type}
                                        onValueChange={(value) => setData("package_type", value)}
                                    >
                                        <SelectTrigger id="package_type">
                                            <SelectValue placeholder="Select package type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(PackageTypes).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {errors.package_type && (
                                        <p className="text-sm text-red-500">{errors.package_type}</p>
                                    )}
                                </div>


                                  <div className="space-y-2">
                                    <Label htmlFor="package_amount">
                                        Package Amount <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="package_amount"
                                        value={data.package_amount}
                                        onChange={(e) => setData("package_amount", e.target.value)}
                                        placeholder="1000"
                                    />
                                    {errors.package_amount && (
                                        <p className="text-sm text-red-500">{errors.package_amount}</p>
                                    )}
                                </div>

                                {/* Description Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Remarks
                                    </Label>
                                    <Textarea
                                        id="remark"
                                        value={data.remark}
                                        onChange={(e) => setData("remark", e.target.value)}
                                        placeholder="Short description about the group"
                                        rows={4}
                                    />
                                    {errors.remark && (
                                        <p className="text-sm text-red-500">{errors.remark}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button type="submit" disabled={processing}>
                                    Create Fee Package
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
