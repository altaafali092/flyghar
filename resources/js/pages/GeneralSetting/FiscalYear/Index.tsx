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
import { Ward } from "@/types/admin/oneTimeSetting"
import { Switch } from "@/components/ui/switch"
import { FiscalYear } from "@/types/admin/generalSettings"


interface FiscalYearProps {
    wards: PaginatedResponse<FiscalYear>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Fiscal Year",
        href: route("fiscal-year.index"),
    },
]

export default function FiscalYearIndex() {
    const { fiscalYears } = usePage<{ fiscalYears: FiscalYearProps }>().props

    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredFiscalYears = fiscalYears.data.filter((fiscalYear) =>
        fiscalYear.fiscal_year.toLowerCase().includes(search.toLowerCase())



    )

    const toggleStatus = (id: number) => {
        router.get(route('fiscal-year.updateStatus', id), {}, {
            preserveScroll: true,
        })
    }



    const deleteFiscalYear = (fiscalYear: FiscalYear) => {
        if (!window.confirm("Are you sure you want to delete this Fiscal Year?")) return
        router.delete(route("fiscal-year.destroy", fiscalYear.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fiscal Year List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Fiscal Year List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search wards..."


                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route("wards.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Fiscal </TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredFiscalYears.length > 0 ? (
                                    filteredFiscalYears.map((fiscalYear, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{fiscalYear.fiscal_year}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={fiscalYear.status}
                                                        onCheckedChange={() => toggleStatus(fiscalYear.id)}
                                                    />
                                                    <span className={`text-sm font-medium ${fiscalYear.status ? 'text-green-600' : 'text-red-600'}`}>
                                                        {fiscalYear.status ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                
                                                <Link href={route("fiscal-year.edit", fiscalYear.id)}>
                                                    <Button size="icon" variant="outline"><Pencil className="w-4 h-4" /></Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteFiscalYear(fiscalYear)}
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

                        <Pagination links={fiscalYears.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
