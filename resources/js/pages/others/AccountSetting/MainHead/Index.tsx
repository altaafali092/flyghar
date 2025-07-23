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
import { MainHead } from "@/types/admin/accountSettings"


interface MainHeadProps {
    mainHeads: PaginatedResponse<MainHead>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Main Heads",
        href: route("main-heads.index"),
    },
]

export default function GroupIndex() {
    const { mainHeads } = usePage<{ mainHeads: MainHeadProps }>().props

    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredMainHeads = mainHeads.data.filter((mainHead) =>
        mainHead.main_head_name.toLowerCase().includes(search.toLowerCase())
    )

    const toggleStatus = (id: number) => {
        router.get(route('main-heads.updateStatus', id), {}, {
            preserveScroll: true,
        })
    }


    const deleteMainHead = (mainHead: MainHead) => {
        if (!window.confirm("Are you sure you want to delete this shift?")) return
        router.delete(route("main-heads.destroy", mainHead.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Main Head List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Main Head List</CardTitle>
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
                            <Link href={route("main-heads.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead> Account Group</TableHead>
                                    <TableHead>Main Account Head</TableHead>
                                    <TableHead>Remark</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredMainHeads.length > 0 ? (
                                    filteredMainHeads.map((mainHead, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{mainHead.account_group}</TableCell>
                                            <TableCell>{mainHead.main_head_name}</TableCell>
                                            <TableCell>{mainHead.remark}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={mainHead.status}
                                                        onCheckedChange={() => toggleStatus(mainHead.id)}
                                                    />
                                                    <span className={`text-sm font-medium ${mainHead.status ? 'text-green-600' : 'text-red-600'}`}>
                                                        {mainHead.status ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route("main-heads.show", mainHead.id)}>
                                                    <Button size="icon" variant="outline"><Eye className="w-4 h-4" /></Button>
                                                </Link>
                                                <Link href={route("main-heads.edit", mainHead.id)}>
                                                    <Button size="icon" variant="outline"><Pencil className="w-4 h-4" /></Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteMainHead(mainHead)}
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

                        <Pagination links={mainHeads.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
