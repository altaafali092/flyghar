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
import { Switch } from "@/components/ui/switch"
import { LedgerHead, SubLedgerHead } from "@/types/admin/accountSettings"


interface SubLedgerHeadProps {
    subLedgerHeads: PaginatedResponse<SubLedgerHead>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Sub Ledger Heads",
        href: route("sub-ledger-heads.index"),
    },
]

export default function GroupIndex() {
    const { subLedgerHeads } = usePage<{ subLedgerHeads: SubLedgerHeadProps }>().props
    console.log(subLedgerHeads)
   
    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredSubLedgerHeads = subLedgerHeads.data.filter((subLedgerHead) =>
        subLedgerHead.sub_ledger_head_name.toLowerCase().includes(search.toLowerCase())
    )

    const toggleStatus = (id: number) => {
        router.get(route('sub-ledger-heads.updateStatus', id), {}, {
            preserveScroll: true,
        })
    }

    const deleteSubLedgerHead = (subLedgerHead: SubLedgerHead) => {
        if (!window.confirm("Are you sure you want to delete this shift?")) return
        router.delete(route("sub-ledger-heads.destroy", subLedgerHead.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sub Ledger Head List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Sub Ledger Head List</CardTitle>

                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search Main Heads..."
                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route("sub-ledger-heads.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Account Group</TableHead>
                                    <TableHead> Account Main Head</TableHead>
                                    <TableHead>Sub Ledger Name</TableHead>
                                    <TableHead>Sub Ledger Number</TableHead>
                                    <TableHead>Remark</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredSubLedgerHeads.length > 0 ? (
                                    filteredSubLedgerHeads.map((subLedgerHead, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{subLedgerHead.ledger_head_id?.main_head_id?.account_group}</TableCell>
                                            <TableCell>{subLedgerHead.ledger_head_id?.main_head_id?.main_head_name}</TableCell>
                                            <TableCell>{subLedgerHead.sub_ledger_head_name}</TableCell>
                                            <TableCell>{subLedgerHead.sub_ledger_head_code}</TableCell>
                                            <TableCell>{subLedgerHead.remark}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={subLedgerHead.is_active}
                                                        onCheckedChange={() => toggleStatus(subLedgerHead.id)}
                                                    />
                                                    <span className={`text-sm font-medium ${subLedgerHead.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                                        {subLedgerHead.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route("sub-ledger-heads.show", subLedgerHead.id)}>
                                                    <Button size="icon" variant="outline"><Eye className="w-4 h-4" /></Button>
                                                </Link>
                                                <Link href={route("sub-ledger-heads.edit", subLedgerHead.id)}>
                                                    <Button size="icon" variant="outline"><Pencil className="w-4 h-4" /></Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteSubLedgerHead(subLedgerHead)}
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

                        <Pagination links={subLedgerHeads.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
