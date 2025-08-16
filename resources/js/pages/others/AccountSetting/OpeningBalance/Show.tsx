"use client"

import { Head, Link } from "@inertiajs/react"
import { route } from "ziggy-js"
import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbItem } from "@/types"
import { ArrowLeft, Edit, FileText, Calendar, DollarSign, Building2, Hash, Image as ImageIcon } from "lucide-react"
import { OpeningBalance, SubLedgerHead } from "@/types/admin/accountSettings"

interface OpeningBalanceShowProps {
    openingBalance: OpeningBalance
}

export default function OpeningBalanceShow({ openingBalance }: OpeningBalanceShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Opening Balances", href: route("opening-balance.index") },
        { title: "View Details", href: "" }
    ]

    // Since openingBalance is a single object, not an array
    const totalDebit = parseFloat(String(openingBalance?.debit)) || 0
    const totalCredit = parseFloat(String(openingBalance?.credit)) || 0
    const isBalanced = totalDebit === totalCredit

    if (!openingBalance) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Opening Balance Details" />
                <div className="p-6">
                    <Card className="rounded-2xl border border-border bg-card shadow-sm">
                        <CardContent className="pt-6">
                            <div className="text-center py-12">
                                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium text-foreground mb-2">No Data Found</h3>
                                <p className="text-muted-foreground mb-6">The opening balance record could not be found.</p>
                                <Link href={route("opening-balance.index")}>
                                    <Button variant="outline">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to List
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Opening Balance Details" />

            <div className="p-6 space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Opening Balance Details</h1>
                        <p className="text-muted-foreground mt-1">
                            View detailed information for this opening balance entry
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route("opening-balance.index")}>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to List
                            </Button>
                        </Link>
                        <Link href={route("opening-balance.edit", openingBalance.id)}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* General Information Card */}
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            General Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Hash className="h-4 w-4" />
                                    <span className="text-sm font-medium">Voucher Number</span>
                                </div>
                                <p className="text-foreground font-medium">{openingBalance.voucher_no || 'N/A'}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm font-medium">Fiscal Year</span>
                                </div>
                                <p className="text-foreground font-medium">{openingBalance.fiscal_year || 'N/A'}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm font-medium">Date Created</span>
                                </div>
                                <p className="text-foreground font-medium">
                                    {(openingBalance as any).created_at ? new Date((openingBalance as any).created_at).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Building2 className="h-4 w-4" />
                                    <span className="text-sm font-medium">Status</span>
                                </div>
                                <Badge variant={openingBalance.is_active ? "default" : "secondary"}>
                                    {openingBalance.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>

                            {openingBalance.image && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <ImageIcon className="h-4 w-4" />
                                        <span className="text-sm font-medium">Attachment</span>
                                    </div>
                                    <img
                                        src={openingBalance.image}
                                        alt={`Voucher ${openingBalance.voucher_no}`}
                                        className="w-16 h-16 rounded-md object-cover border border-border"
                                    />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Account Entry Details */}
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                Account Entry
                            </CardTitle>
                            <Badge variant={isBalanced ? "default" : "destructive"}>
                                {isBalanced ? 'Balanced' : 'Unbalanced'}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full border border-border">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="p-3 text-left text-foreground font-medium">Account Head</th>
                                        <th className="p-3 text-right text-foreground font-medium">Debit</th>
                                        <th className="p-3 text-right text-foreground font-medium">Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-border hover:bg-muted/20 transition-colors">
                                        <td className="p-3">
                                            <div className="font-medium text-foreground">
                                                {(openingBalance as any).sub_ledger_head?.sub_ledger_head_name || 'Unknown Account'}
                                            </div>
                                        </td>
                                        <td className="p-3 text-right font-mono">
                                            {totalDebit > 0 ? (
                                                <span className="text-foreground font-medium">
                                                    {totalDebit.toLocaleString('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </td>
                                        <td className="p-3 text-right font-mono">
                                            {totalCredit > 0 ? (
                                                <span className="text-foreground font-medium">
                                                    {totalCredit.toLocaleString('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr className="bg-muted/30 font-semibold">
                                        <td className="p-3 text-right text-foreground">
                                            <strong>Total:</strong>
                                        </td>
                                        <td className="p-3 text-right font-mono text-foreground">
                                            <strong>
                                                {totalDebit.toLocaleString('en-US', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </strong>
                                        </td>
                                        <td className="p-3 text-right font-mono text-foreground">
                                            <strong>
                                                {totalCredit.toLocaleString('en-US', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </strong>
                                        </td>
                                    </tr>
                                    {!isBalanced && (
                                        <tr>
                                            <td colSpan={3} className="p-3 text-center">
                                                <div className="flex items-center justify-center gap-2 text-destructive">
                                                    <span className="text-sm font-medium">
                                                        ⚠️ Warning: Debits and Credits are not balanced
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tfoot>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Card */}
                <Card className="rounded-2xl border border-border bg-card shadow-sm">
                    <CardHeader>
                        <CardTitle>Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-center p-4 rounded-lg bg-muted/20">
                                <div className="text-2xl font-bold text-foreground">
                                    {totalDebit.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </div>
                                <div className="text-sm text-muted-foreground">Total Debit</div>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/20">
                                <div className="text-2xl font-bold text-foreground">
                                    {totalCredit.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </div>
                                <div className="text-sm text-muted-foreground">Total Credit</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
