"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem,  } from "@/types"
import { FiscalYear } from "@/types/admin/generalSettings"

interface FiscalYearFormProps {
  fiscalYear?: FiscalYear // If undefined => create, else => edit
}

export default function FiscalYearForm({ fiscalYear }: FiscalYearFormProps) {
  const isEdit = !!fiscalYear

  const { data, setData, post, put, processing, errors } = useForm({
    fiscal_year: fiscalYear?.fiscal_year || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEdit) {
      put(route("fiscal-year.update", fiscalYear!.id))
    } else {
      post(route("fiscal-year.store"))
    }
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Fiscal Years", href: route("fiscal-year.index") },
    {
      title: isEdit ? "Edit" : "Create",
      href: isEdit ? route("fiscal-year.edit", fiscalYear?.id) : route("fiscal-year.create"),
    },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={isEdit ? `Edit Fiscal Year - ${fiscalYear?.fiscal_year}` : "Create Fiscal Year"} />

      <div className="p-6 space-y-6">
        <Card className="rounded-2xl border border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {isEdit ? "Edit Fiscal Year" : "Create New Fiscal Year"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ward Name */}
                <div className="space-y-2">
                  <Label htmlFor="fiscal_year">
                    Ward Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fiscal_year"
                    value={data.fiscal_year}
                    onChange={(e) => setData("fiscal_year", e.target.value)}
                    placeholder="2082/82"
                  />
                  {errors.fiscal_year && (
                    <p className="text-sm text-red-500">{errors.fiscal_year}</p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button type="submit" disabled={processing}>
                  {isEdit ? "Update Fiscal Year" : "Create Fiscal Year"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
