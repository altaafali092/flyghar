"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem, FeePackage } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const PackageTypes = {
    regular: "Regular",
    Miscellaneous: "Miscellaneous",
}

export default function FeePackageEdit({ feePackage }: { feePackage: FeePackage }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Fee Packages", href: route("fee-packages.index") },
        { title: "Edit", href: route("fee-packages.edit", feePackage.id) },
    ]

    const { data, setData, put, processing, errors } = useForm({
        package_name: feePackage.package_name ?? "",
        package_type: feePackage.package_type ?? "",
        package_amount: feePackage.package_amount ?? "",
        remark: feePackage.remark ?? "",
        description: feePackage.description ?? "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route("fee-packages.update", feePackage.id))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Fee Package" />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Edit Fee Package</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="package_name">
                                        Package Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="package_name"
                                        value={data.package_name}
                                        onChange={(e) => setData("package_name", e.target.value)}
                                        placeholder="e.g., Monthly Fee"
                                    />
                                    {errors.package_name && (
                                        <p className="text-sm text-red-500">{errors.package_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="package_type">
                                        Package Type <span className="text-red-500">*</span>
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

                                <div className="space-y-2">
                                    <Label htmlFor="remark">Remarks</Label>
                                    <Textarea
                                        id="remark"
                                        value={data.remark}
                                        onChange={(e) => setData("remark", e.target.value)}
                                        placeholder="Short note about this package"
                                        rows={4}
                                    />
                                    {errors.remark && (
                                        <p className="text-sm text-red-500">{errors.remark}</p>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" disabled={processing}>
                                    Update Fee Package
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
