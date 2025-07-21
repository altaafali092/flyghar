"use client"

import { Head, router, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { Textarea } from "@/components/ui/textarea" // ✅ Correct import

import { ContactGroup } from "@/types/admin/oneTimeSetting"

interface ContactGroupProps {
    contactGroup?: ContactGroup // undefined for create
}

export default function ContactGroupForm({ contactGroup }: ContactGroupProps) {
    const isEdit = !!contactGroup

    const { data, setData, post, put, processing, errors } = useForm({
        contact_name: contactGroup?.contact_name || "",
        contact_detail: contactGroup?.contact_detail || "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isEdit) {
            put(route("contact-groups.update", contactGroup!.id))
        } else {
            post(route("contact-groups.store"))
        }
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Contact Groups", href: route("contact-groups.index") },
        {
            title: isEdit ? "Edit" : "Create",
            href: isEdit
                ? route("contact-groups.edit", contactGroup?.id)
                : route("contact-groups.create"),
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? `Edit Contact Group - ${contactGroup?.contact_name}` : "Create Contact Group"} />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            {isEdit ? "Edit Contact Group" : "Create New Contact Group"}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Group Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="contact_name">
                                        Group Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="contact_name"
                                        value={data.contact_name}
                                        onChange={(e) => setData("contact_name", e.target.value)}
                                    />
                                    {errors.contact_name && (
                                        <p className="text-sm text-red-500">{errors.contact_name}</p>
                                    )}
                                </div>

                                {/* Group Detail */}
                                <div className="space-y-2">
                                    <Label htmlFor="contact_detail">
                                        Group Detail
                                    </Label>
                                    <Textarea
                                        id="contact_detail"
                                        value={data.contact_detail}
                                        onChange={(e) => setData("contact_detail", e.target.value)}
                                        placeholder="Short description about the group"
                                        rows={4}
                                    />
                                    {errors.contact_detail && (
                                        <p className="text-sm text-red-500">{errors.contact_detail}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <Button type="submit" disabled={processing}>
                                    {isEdit ? "Update Contact Group" : "Create Contact Group"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
