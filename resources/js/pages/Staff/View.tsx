"use client"

import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { BreadcrumbItem } from "@/types"
import { Staff } from "@/types/admin/Staff"

const genderOptions = {
    male: "Male",
    female: "Female",
    other: "Other",
}

interface StaffProps {
    staff: Staff
}

export default function StaffDetail({ staff }: StaffProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Staff", href: route("staff.index") },
        { title: `View - ${staff.name}`, href: "#" },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Staff Detail - ${staff.name}`} />
            <div className="p-6">
                <Card className="rounded-2xl shadow-md border border-border bg-background">
                    <CardContent className="pt-6 space-y-8">

                        {/* Header: Image + Name + Position */}
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div>
                                {staff.image ? (
                                    <img
                                        src={staff.image}
                                        alt="Profile"
                                        className="w-32 h-32 object-cover rounded-xl border shadow-sm"
                                    />
                                ) : (
                                    <div className="w-32 h-32 flex items-center justify-center border rounded-xl text-muted-foreground text-sm bg-muted">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-1">{staff.name}</h2>
                                <p className="text-muted-foreground text-sm">{staff.position}</p>
                            </div>
                        </div>

                        {/* Detail Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem label="Email" value={staff.email} />
                            <DetailItem label="Phone" value={staff.phone} />
                            <DetailItem label="Gender" value={staff.gender || "N/A"} />
                            <DetailItem label="Date of Birth" value={staff.date_of_birth.slice(0, 10)} />

                            <DetailItem label="Address" value={staff.address} />
                            <DetailItem label="Position" value={staff.position} />
                            <div className="md:col-span-2">
                                <DetailItem label="Remark" value={staff.remark || "—"} multiline />
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

// Reusable detail display block
function DetailItem({
    label,
    value,
    multiline = false,
}: {
    label: string
    value: string
    multiline?: boolean
}) {
    return (
        <div>
            <Label className="text-muted-foreground block text-sm mb-1">{label}</Label>
            <p className={`text-sm text-foreground ${multiline ? "whitespace-pre-wrap" : ""}`}>
                {value}
            </p>
        </div>
    )
}
