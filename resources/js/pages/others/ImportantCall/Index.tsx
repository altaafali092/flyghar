

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
import { ImportantCall } from "@/types/admin/others"

interface ContactProps {
    data: any
    meta: any
    importantContacts: PaginatedResponse<ImportantCall>
    
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Important Call",
        href: route("imp-contacts.index"),
    },
]

export default function ImportantCallIndex() {
    const { importantContacts } = usePage<{importantContacts: ContactProps}>().props

    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredimportantContacts = importantContacts.data.filter((contact: ImportantCall) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.group_type.toLowerCase().includes(search.toLowerCase())||
        contact.phone.toLowerCase().includes(search.toLowerCase())||
        contact.email.toLowerCase().includes(search.toLowerCase())

    )



    const deleteContact = (contact: ImportantCall) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return
        router.delete(route("imp-contacts.destroy", contact.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Important Call List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Important Call List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search important call..."
                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route("imp-contacts.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Group Type</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>Is Active</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredimportantContacts.length > 0 ? (
                                    filteredimportantContacts.map((contact: ImportantCall, index: number) => (
                                        <TableRow key={contact.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{contact.group_type}</TableCell>
                                            <TableCell>{contact.name}</TableCell>
                                            <TableCell>{contact.email}</TableCell>
                                            <TableCell>{contact.phone}</TableCell>
                                            <TableCell>{contact.details}</TableCell>
                                            <TableCell>{contact.is_active ? "Active" : "Inactive"}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route("imp-contact.show", contact.id)}>
                                                    <Button size="icon" variant="outline">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route("imp-contact.edit", contact.id)}>
                                                    <Button size="icon" variant="outline">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteContact(contact)}
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
                                            No important call found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                    <Pagination links={importantContacts.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
