"use client"

import { useState } from "react"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/pagination"
import AppLayout from "@/layouts/app-layout"
import useFlashToast from "@/components/useFlashToast"
import { BreadcrumbItem } from "@/types"
import { PaginatedResponse } from "@/types/admin/pagination"
import { ContactGroup } from "@/types/admin/oneTimeSetting"
import { Switch } from "@/components/ui/switch"


interface ContactGroupProps {
    contactGroups: PaginatedResponse<ContactGroup>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Contact Groups",
        href: route("contact-groups.index"),
    },
]

export default function GroupIndex() {
    const { contactGroups } = usePage<{ contactGroups: ContactGroupProps }>().props

    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredContactGroups = contactGroups.data.filter((contactGroup) =>
        contactGroup.contact_name.toLowerCase().includes(search.toLowerCase())
    )

    const toggleStatus = (id: number) => {
        router.get(route('contact-groups.updateStatus', id), {}, {

            preserveScroll: true,
        })
    }


    const deleteContactGroup = (contactGroup: ContactGroup) => {
        if (!window.confirm("Are you sure you want to delete this shift?")) return
        router.delete(route("contact-groups.destroy", contactGroup.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Groups List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Contact Groups List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search Contact Groups..."
                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route("contact-groups.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Contact Group</TableHead>
                                    <TableHead>Detail</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredContactGroups.length > 0 ? (
                                    filteredContactGroups.map((contactGroup, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{contactGroup.contact_name}</TableCell>
                                            <TableCell>{contactGroup.contact_detail}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={contactGroup.is_active}
                                                        onCheckedChange={() => toggleStatus(contactGroup.id)}
                                                    />
                                                    <span className={`text-sm font-medium ${contactGroup.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                                        {contactGroup.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route("contact-groups.show", contactGroup.id)}>
                                                    <Button size="icon" variant="outline"><Eye className="w-4 h-4" /></Button>
                                                </Link>
                                                <Link href={route("contact-groups.edit", contactGroup.id)}>
                                                    <Button size="icon" variant="outline"><Pencil className="w-4 h-4" /></Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteContactGroup(contactGroup)}
                                                    variant="outline"
                                                    size="icon"
                                                    className="hover:bg-red-400"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                                            No shifts found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>

                        <Pagination links={contactGroups.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
