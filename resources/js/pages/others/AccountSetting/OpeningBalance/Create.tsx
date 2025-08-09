"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { Plus, X } from "lucide-react"

interface SubLedgerHead {
    id: number
    sub_ledger_head_name: string
}

interface OpeningBalanceFormProps {
    subLedgerHeads: SubLedgerHead[]
}

export default function OpeningBalanceCreate({ subLedgerHeads }: OpeningBalanceFormProps) {
    const { data, setData, post, processing, errors } = useForm({
        rows: [
            { sub_ledger_head_id: "", debit: "", credit: "" }
        ]
    })

    const addRow = () => {
        setData("rows", [...data.rows, { sub_ledger_head_id: "", debit: "", credit: "" }])
    }

    const removeRow = (index: number) => {
        const updated = [...data.rows]
        updated.splice(index, 1)
        setData("rows", updated)
    }

    const handleChange = (index: number, field: keyof typeof data.rows[number], value: string) => {
        const updated = [...data.rows]
        updated[index][field] = value
        setData("rows", updated)
    }

    const totalDebit = data.rows.reduce((sum, row) => sum + (parseFloat(row.debit) || 0), 0)
    const totalCredit = data.rows.reduce((sum, row) => sum + (parseFloat(row.credit) || 0), 0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route("opening-balance.store"))
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Opening Balances", href: route("opening-balance.index") },
        { title: "Create", href: route("opening-balance.create") }
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Opening Balance" />

            <div className="p-6 space-y-6">
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            Add Opening Balance
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="overflow-x-auto">
                                <table className="w-full border border-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 text-left">Account Head</th>
                                            <th className="p-2 text-left">Debit</th>
                                            <th className="p-2 text-left">Credit</th>
                                            <th className="p-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.rows.map((row, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="p-2">
                                                    <select
                                                        className="w-full border rounded-md p-2"
                                                        value={row.sub_ledger_head_id}
                                                        onChange={(e) =>
                                                            handleChange(index, "sub_ledger_head_id", e.target.value)
                                                        }
                                                    >
                                                        <option value="">Choose account head...</option>
                                                        {subLedgerHeads.map((head) => (
                                                            <option key={head.id} value={head.id}>
                                                                {head.sub_ledger_head_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors[`rows.${index}.sub_ledger_head_id`] && (
                                                        <p className="text-red-500 text-sm">{errors[`rows.${index}.sub_ledger_head_id`]}</p>
                                                    )}
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        className="w-full border rounded-md p-2"
                                                        placeholder="Dr. 0.00"
                                                        value={row.debit}
                                                        onChange={(e) =>
                                                            handleChange(index, "debit", e.target.value)
                                                        }
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        className="w-full border rounded-md p-2"
                                                        placeholder="Cr. 0.00"
                                                        value={row.credit}
                                                        onChange={(e) =>
                                                            handleChange(index, "credit", e.target.value)
                                                        }
                                                    />
                                                </td>
                                                <td className="p-2 flex gap-2">
                                                    <Button type="button" size="icon" variant="success" onClick={addRow}>
                                                        <Plus size={16} />
                                                    </Button>
                                                    {data.rows.length > 1 && (
                                                        <Button type="button" size="icon" variant="destructive" onClick={() => removeRow(index)}>
                                                            <X size={16} />
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="font-semibold bg-gray-50">
                                            <td className="p-2 text-right">Total</td>
                                            <td className="p-2">{`Dr. ${totalDebit.toFixed(2)}`}</td>
                                            <td className="p-2">{`Cr. ${totalCredit.toFixed(2)}`}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" disabled={processing}>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
