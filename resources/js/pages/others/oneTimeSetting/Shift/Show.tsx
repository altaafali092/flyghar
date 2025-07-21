"use client"

import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem, Shift } from "@/types"

interface ShiftShowProps {
  shift: Shift
}

const ShiftShow = ({ shift }: ShiftShowProps) => {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Shifts", href: route("shifts.index") },
    { title: "Show", href: route("shifts.show", shift.id) },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Shift Details - ${shift.shift_name}`} />

      <div className="p-6 space-y-6">
        <Card className="rounded-2xl border border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Shift Details</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              {/* Shift Name */}
              <div>
                <p className="text-xs font-medium text-foreground">Shift Name</p>
                <p className="mt-1">{shift.shift_name ?? "-"}</p>
              </div>

              {/* Shift Detail */}
              <div>
                <p className="text-xs font-medium text-foreground">Shift Detail</p>
                <p className="mt-1">{shift.shift_detail ?? "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default ShiftShow
