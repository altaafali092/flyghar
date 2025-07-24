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
import { LedgerHead } from "@/types/admin/accountSettings"


interface LedgerHeadProps {
    ledgerHeads: PaginatedResponse<LedgerHead>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Main Heads",
        href: route("main-heads.index"),
    },
]

export default function GroupIndex() {
    const { ledgerHeads } = usePage<{ ledgerHeads: LedgerHeadProps }>().props
   
    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredLedgerHeads = ledgerHeads.data.filter((ledgerHead) =>
        ledgerHead.ledger_head_name.toLowerCase().includes(search.toLowerCase())
    )

    const toggleStatus = (id: number) => {
        router.get(route('ledger-heads.updateStatus', id), {}, {
            preserveScroll: true,
        })
    }


    const deleteLedgerHead = (ledgerHead: LedgerHead) => {
        if (!window.confirm("Are you sure you want to delete this shift?")) return
        router.delete(route("ledger-heads.destroy", ledgerHead.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Main Head List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Ledger Head List</CardTitle>

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
                            <Link href={route("ledger-heads.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Account Group</TableHead>
                                    <TableHead> Account Main Head</TableHead>
                                    <TableHead>Ledger Head Name</TableHead>
                                    <TableHead>Remark</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredLedgerHeads.length > 0 ? (
                                    filteredLedgerHeads.map((ledgerHead, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{ledgerHead.main_head_id?.account_group}</TableCell>
                                            <TableCell>{ledgerHead.main_head_id?.main_head_name}</TableCell>
                                            <TableCell>{ledgerHead.ledger_head_name}</TableCell>
                                            <TableCell>{ledgerHead.remark}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={ledgerHead.status}
                                                        onCheckedChange={() => toggleStatus(ledgerHead.id)}
                                                    />
                                                    <span className={`text-sm font-medium ${ledgerHead.status ? 'text-green-600' : 'text-red-600'}`}>
                                                        {ledgerHead.status ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route("ledger-heads.show", ledgerHead.id)}>
                                                    <Button size="icon" variant="outline"><Eye className="w-4 h-4" /></Button>
                                                </Link>
                                                <Link href={route("ledger-heads.edit", ledgerHead.id)}>
                                                    <Button size="icon" variant="outline"><Pencil className="w-4 h-4" /></Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteLedgerHead(ledgerHead)}
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

                        <Pagination links={ledgerHeads.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
