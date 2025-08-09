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
import { OpeningBalance, SubLedgerHead } from "@/types/admin/accountSettings"


interface OpeningBalanceProps {
    openingBalances: PaginatedResponse<OpeningBalance>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Opening Balance",
        href: route("opening-balance.index"),
    },
]

export default function OpeningBalanceIndex() {
    const { openingBalances } = usePage<{ openingBalances: OpeningBalanceProps }>().props
    console.log(openingBalances)

    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredOpeningBalances = openingBalances.data.filter((openingBalance) =>
        openingBalance.debit?.toLowerCase().includes(search.toLowerCase()) ||
        openingBalance.credit?.toLowerCase().includes(search.toLowerCase())
    )

    const toggleStatus = (id: number) => {
        router.get(route('opening-balance.updateStatus', id), {}, {
            preserveScroll: true,
        })
    }

    const deleteOpeningBalance = (openingBalance: OpeningBalance) => {
        if (!window.confirm("Are you sure you want to delete this shift?")) return
        router.delete(route("opening-balances.destroy", openingBalance.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Opening Balance List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Opening Balance List</CardTitle>

                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search Opening Balance ..."
                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route("opening-balance.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Fiscal Year</TableHead>
                                    <TableHead>Voucher No.</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Sub Ledger Name</TableHead>
                                    <TableHead>Debit</TableHead>
                                    <TableHead>Credit</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredOpeningBalances.length > 0 ? (
                                    filteredOpeningBalances.map((openingBalance, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{openingBalance.fiscal_year}</TableCell>

                                            <TableCell>{openingBalance.voucher_no}</TableCell>
                                            <TableCell>
                                                <img src={openingBalance.image} alt={openingBalance.voucher_no} className="w-12 h-12 rounded-md" />
                                            </TableCell>

                                            <TableCell>{openingBalance.sub_ledger_head_id?.sub_ledger_head_name}</TableCell>
                                            <TableCell>{openingBalance.debit}</TableCell>
                                            <TableCell>{openingBalance.credit}</TableCell>
                                            <TableCell>{new Date(openingBalance.created_at).toLocaleDateString()}</TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={openingBalance.is_active}
                                                        onCheckedChange={() => toggleStatus(openingBalance.id)}
                                                    />
                                                    <span className={`text-sm font-medium ${openingBalance.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                                        {openingBalance.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route("sub-ledger-heads.show", openingBalance.id)}>
                                                    <Button size="icon" variant="outline"><Eye className="w-4 h-4" /></Button>
                                                </Link>
                                                <Link href={route("opening-balance.edit", openingBalance.id)}>
                                                    <Button size="icon" variant="outline"><Pencil className="w-4 h-4" /></Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteOpeningBalance(openingBalance)}
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

                        <Pagination links={openingBalances.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
