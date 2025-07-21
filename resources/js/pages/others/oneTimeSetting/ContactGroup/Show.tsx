"use client"

import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { ContactGroup } from "@/types/admin/oneTimeSetting"

interface ContactGroupProps {
    contactGroup: ContactGroup
}

const ContactGroupShow = ({ contactGroup }: ContactGroupProps) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Contact Groups", href: route("contact-groups.index") },
        { title: "Show", href: route("contact-groups.show", contactGroup.id) },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Contact Group Details - ${contactGroup.contact_name}`} />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Contact Group Details</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">

                            <div>
                                <p className="text-xs font-medium text-foreground">Contact Name</p>
                                <p className="mt-1">{contactGroup.contact_name ?? "-"}</p>
                            </div>


                            <div>
                                <p className="text-xs font-medium text-foreground">Contact Detail</p>
                                <p className="mt-1">{contactGroup.contact_detail ?? "-"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

export default ContactGroupShow
