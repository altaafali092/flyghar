"use client"

import { useState } from "react"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/pagination"
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from "@/types"
import { GoodsGroup } from "@/types/admin/goodsgroup"
import { Switch } from "@/components/ui/switch"
import useFlashToast from "@/components/useFlashToast"

interface GoodsGroupProps {
    goodsGroups: {
        data: GoodsGroup[]
        current_page: number
        last_page: number
        links: {
            url: string | null
            label: string
            active: boolean
        }[]
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Goods Groups',
        href: route('goods-group.index'),
    },
]

export default function GoodsGroupIndex() {
    const { goodsGroups } = usePage<{ goodsGroups: GoodsGroupProps["goodsGroups"] }>().props
    useFlashToast()
    const [search, setSearch] = useState("")

    const filtered = goodsGroups.data.filter((goodsGroup) =>
        goodsGroup.name.toLowerCase().includes(search.toLowerCase())
    )

    const deleteGoodsGroup = (goodsGroup: GoodsGroup) => {
        if (!window.confirm('Are you sure you want to delete this goods group?')) return

        router.delete(route('goods-group.destroy', goodsGroup.id), {
            preserveScroll: true,
        })
    }

    const toggleStatus = (id: number) => {
        router.get(route('goods-group.updateStatus', id), {}, {
            preserveScroll: true,
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Goods Group List" />
            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle>Goods Group List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex justify-between mb-4">
                            <Input
                                type="text"
                                placeholder="Search goods group..."
                                className="w-1/3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link href={route('goods-group.create')}>
                                <Button>Add New</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filtered.length > 0 ? (
                                    filtered.map((goodsGroup, index) => (
                                        <TableRow key={goodsGroup.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{goodsGroup.name}</TableCell>
                                            <TableCell>{goodsGroup.description}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={goodsGroup.is_active}
                                                        onCheckedChange={() => toggleStatus(goodsGroup.id)}
                                                    />
                                                    <span className={`text-sm font-medium ${goodsGroup.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                                        {goodsGroup.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right space-x-2">
                                                <Link href={route('goods-group.show', goodsGroup.id)}>
                                                    <Button size="icon" variant="outline">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('goods-group.edit', goodsGroup.id)}>
                                                    <Button size="icon" variant="outline">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => deleteGoodsGroup(goodsGroup)}
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
                                            No goods groups found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <Pagination links={goodsGroups.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
