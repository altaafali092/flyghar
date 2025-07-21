"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem, Ward } from "@/types"

interface WardFormProps {
  ward?: Ward // If undefined => create, else => edit
}

export default function WardForm({ ward }: WardFormProps) {
  const isEdit = !!ward

  const { data, setData, post, put, processing, errors } = useForm({
    ward_name: ward?.ward_name || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEdit) {
      put(route("wards.update", ward!.id))
    } else {
      post(route("wards.store"))
    }
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Wards", href: route("wards.index") },
    {
      title: isEdit ? "Edit" : "Create",
      href: isEdit ? route("wards.edit", ward?.id) : route("wards.create"),
    },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={isEdit ? `Edit Ward - ${ward?.ward_name}` : "Create Ward"} />

      <div className="p-6 space-y-6">
        <Card className="rounded-2xl border border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {isEdit ? "Edit Ward" : "Create New Ward"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ward Name */}
                <div className="space-y-2">
                  <Label htmlFor="ward_name">
                    Ward Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ward_name"
                    value={data.ward_name}
                    onChange={(e) => setData("ward_name", e.target.value)}
                  />
                  {errors.ward_name && (
                    <p className="text-sm text-red-500">{errors.ward_name}</p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button type="submit" disabled={processing}>
                  {isEdit ? "Update Ward" : "Create Ward"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
