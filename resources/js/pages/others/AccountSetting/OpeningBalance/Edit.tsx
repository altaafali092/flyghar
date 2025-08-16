"use client"

import { Head, useForm } from "@inertiajs/react"
import { route } from "ziggy-js"
import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { Plus, X } from "lucide-react"
import { OpeningBalance, SubLedgerHead } from "@/types/admin/accountSettings"



interface OpeningBalanceEditProps {
  openingBalanceId: number
  openingBalance: OpeningBalance[]
  subLedgerHeads: SubLedgerHead[]
}

export default function OpeningBalanceEdit({
  openingBalanceId,
  openingBalance,
  subLedgerHeads,
}: OpeningBalanceEditProps) {
  const { data, setData, put, processing, errors } = useForm({
    rows:
      openingBalance && openingBalance.length > 0
        ? openingBalance.map((row) => ({
            sub_ledger_head_id: String(row.sub_ledger_head_id || ""),
            debit: String(row.debit || ""),
            credit: String(row.credit || ""),
            id: row.id,
          }))
        : [{ sub_ledger_head_id: "", debit: "", credit: "" }],
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
    put(route("opening-balance.update", openingBalance))
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Opening Balances", href: route("opening-balance.index") },
    { title: "Edit", href: "" },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Opening Balance" />

      <div className="p-6 space-y-6">
        <Card className="rounded-2xl border border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Edit Opening Balance</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full border border-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-2 text-left text-foreground">Account Head</th>
                      <th className="p-2 text-left text-foreground">Debit</th>
                      <th className="p-2 text-left text-foreground">Credit</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((row, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="p-2">
                          <select
                            className="w-full border border-input bg-background text-foreground rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring"
                            value={row.sub_ledger_head_id}
                            onChange={(e) => handleChange(index, "sub_ledger_head_id", e.target.value)}
                          >
                            <option value="">Choose account head...</option>
                            {subLedgerHeads.map((head) => (
                              <option key={head.id} value={head.id}>
                                {head.sub_ledger_head_name}
                              </option>
                            ))}
                          </select>
                          {errors[`rows.${index}.sub_ledger_head_id`] && (
                            <p className="text-destructive text-sm">{errors[`rows.${index}.sub_ledger_head_id`]}</p>
                          )}
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            className="w-full border border-input bg-background text-foreground rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Dr. 0.00"
                            value={row.debit}
                            onChange={(e) => handleChange(index, "debit", e.target.value)}
                          />
                          {errors[`rows.${index}.debit`] && (
                            <p className="text-destructive text-sm">{errors[`rows.${index}.debit`]}</p>
                          )}
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            className="w-full border border-input bg-background text-foreground rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Cr. 0.00"
                            value={row.credit}
                            onChange={(e) => handleChange(index, "credit", e.target.value)}
                          />
                          {errors[`rows.${index}.credit`] && (
                            <p className="text-destructive text-sm">{errors[`rows.${index}.credit`]}</p>
                          )}
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
                    <tr className="font-semibold bg-muted/30">
                      <td className="p-2 text-right text-foreground">Total</td>
                      <td className="p-2 text-foreground">{`Dr. ${totalDebit.toFixed(2)}`}</td>
                      <td className="p-2 text-foreground">{`Cr. ${totalCredit.toFixed(2)}`}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={processing}>
                  Update
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
