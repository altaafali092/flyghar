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
import { Goods } from "@/types/admin/goodsgroup"
import { PaginatedResponse } from "@/types/admin/pagination"

interface GoodsProps {
    goods: PaginatedResponse<Goods>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Goods",
        href: route("goods.index"),
    },
]

export default function GroupIndex() {
    const { goods } = usePage<{goods: GoodsProps}>().props
   
    const [search, setSearch] = useState("")
    useFlashToast()

    const filteredGoods = goods.data.filter((good) =>
        good.goods_name.toLowerCase().includes(search.toLowerCase()) ||
        good.goodsGroup?.name.toLowerCase().includes(search.toLowerCase())||
        good.model_no.toLowerCase().includes(search.toLowerCase())||
        good.owner.toLowerCase().includes(search.toLowerCase())
    
    )

    const deleteGoods = (good: Goods) => {
        if (!window.confirm("Are you sure you want to delete this goods?")) return
        router.delete(route("goods.destroy", good.id),
            { preserveScroll: true })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Goods List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Goods List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search goods..."
                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route("goods.create")}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Group Name</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Model No.</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredGoods.length > 0 ? (
                                    filteredGoods.map((good, index) => (
                                        <TableRow key={good.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{good.goodsGroup?.name ?? "—"}</TableCell>
                                            <TableCell>{good.goods_name}</TableCell>
                                            <TableCell>{good.model_no}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Link href={route("goods.show", good.id)}>
                                                    <Button size="icon" variant="outline">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route("goods.edit", good.id)}>
                                                    <Button size="icon" variant="outline">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteGoods(good)}
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
                                            No goods found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <Pagination links={goods.meta.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
