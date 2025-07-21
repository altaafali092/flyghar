"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem, Shift } from "@/types"

interface ShiftEditProps {
  shift: Shift
}

const ShiftEdit = ({ shift }: ShiftEditProps) => {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Shifts", href: route("shifts.index") },
    { title: "Edit", href: route("shifts.edit", shift.id) },
  ]

  const { data, setData, put, processing, errors } = useForm({
    shift_name: shift.shift_name || "",
    shift_detail: shift.shift_detail || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(route("shifts.update", shift.id))
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Shift" />

      <div className="p-6 space-y-6">
        <Card className="rounded-2xl border border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Edit Shift</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shift Name */}
                <div className="space-y-2">
                  <Label htmlFor="shift_name">
                    Shift Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="shift_name"
                    value={data.shift_name}
                    onChange={(e) => setData("shift_name", e.target.value)}
                  />
                  {errors.shift_name && (
                    <p className="text-sm text-red-500">{errors.shift_name}</p>
                  )}
                </div>

                {/* Shift Detail */}
                <div className="space-y-2">
                  <Label htmlFor="shift_detail">Shift Detail</Label>
                  <Textarea
                    id="shift_detail"
                    value={data.shift_detail}
                    onChange={(e) => setData("shift_detail", e.target.value)}
                    placeholder="Short description about the shift"
                    rows={4}
                  />
                  {errors.shift_detail && (
                    <p className="text-sm text-red-500">{errors.shift_detail}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" disabled={processing}>
                  Update Shift
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default ShiftEdit
