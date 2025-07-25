"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { BreadcrumbItem } from "@/types"
import { LedgerHead, SubLedgerHead } from "@/types/admin/accountSettings"

interface SubLedgerHeadFormProps {
  subLedgerHead: Partial<SubLedgerHead>
  ledgerHeads?: LedgerHead[]
}

export default function SubLedgerHeadForm({ subLedgerHead, ledgerHeads = [] }: SubLedgerHeadFormProps) {
  const isEdit = !!subLedgerHead?.id

  const { data, setData, post, put, processing, errors } = useForm({
    ledger_head_id: subLedgerHead?.ledger_head_id || "",
    sub_ledger_head_name: subLedgerHead?.sub_ledger_head_name || "",
    remark: subLedgerHead?.remark || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEdit) {
      put(route("sub-ledger-heads.update", subLedgerHead!.id))
    } else {
      post(route("sub-ledger-heads.store"))
    }
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Sub Ledger Heads", href: route("sub-ledger-heads.index") },
    {
      title: isEdit ? "Edit" : "Create",
      href: isEdit
        ? route("sub-ledger-heads.edit", subLedgerHead?.id)
        : route("sub-ledger-heads.create"),
    },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head
        title={
          isEdit
            ? `Edit Sub Ledger Head - ${subLedgerHead?.sub_ledger_head_name}`
            : "Create Sub Ledger Head"
        }
      />

      <div className="p-6 space-y-6">
        <Card className="rounded-2xl border border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {isEdit ? "Edit Sub Ledger Head" : "Create New Sub Ledger Head"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Account Head Select */}
                <div className="space-y-2">
                  <Label htmlFor="ledger_head_id">
                    Ledger Head  Account<span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="ledger_head_id"
                    className="w-full border border-input rounded-md p-2"
                    value={data.ledger_head_id}
                    onChange={(e) => setData("ledger_head_id", e.target.value)}
                  >
                    <option value="">Select Main Account Head</option>
                    {ledgerHeads.map((ledgerHead) => (
                      <option key={ledgerHead.id} value={ledgerHead.id}>
                        {ledgerHead.ledger_head_name}
                      </option>
                    ))}
                  </select>
                  {errors.ledger_head_id && (
                    <p className="text-sm text-red-500">{errors.ledger_head_id}</p>
                  )}
                </div>

                {/* Sub Ledger Name */}
                <div className="space-y-2">
                  <Label htmlFor="sub_ledger_head_name">
                    Sub Ledger Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sub_ledger_head_name"
                    value={data.sub_ledger_head_name}
                    onChange={(e) => setData("sub_ledger_head_name", e.target.value)}
                  />
                  {errors.sub_ledger_head_name && (
                    <p className="text-sm text-red-500">{errors.sub_ledger_head_name}</p>
                  )}
                </div>

                {/* Remark */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="remark">Remark</Label>
                  <Textarea
                    id="remark"
                    value={data.remark}
                    onChange={(e) => setData("remark", e.target.value)}
                    placeholder="Short description about the ledger head"
                    rows={4}
                  />
                  {errors.remark && (
                    <p className="text-sm text-red-500">{errors.remark}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" disabled={processing}>
                  {isEdit ? "Update Sub Ledger Head" : "Create Sub Ledger Head"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
