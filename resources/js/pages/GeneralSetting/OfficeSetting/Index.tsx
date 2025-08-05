"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { Upload } from "lucide-react"
import { OfficeSettings, FiscalYear } from "@/types/admin/generalSettings"
import useFlashToast from "@/components/useFlashToast"

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Office Setting", href: route("office-settings.index") },
]

interface Props {
    officeSetting: OfficeSettings
    fiscalYear: FiscalYear[]
}

export default function OfficeSettingForm({ officeSetting, fiscalYear }: Props) {
    const isEdit = Boolean(officeSetting?.id)
    useFlashToast()

    const { data, setData, post, processing, errors } = useForm({
        fiscal_year_id: officeSetting.fiscal_year_id || "",
        office_name: officeSetting.office_name || "",
        office_gmail: officeSetting.office_gmail || "",
        office_image: null as File | null,
        office_cover: null as File | null,
        office_phone: officeSetting.office_phone || "",
        office_address: officeSetting.office_address || "",
        fb_url: officeSetting.fb_url || "",
        insta_url: officeSetting.insta_url || "",
        youtube_url: officeSetting.youtube_url || "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route("office-settings.store"), { forceFormData: true })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? "Edit Office Setting" : "Create Office Setting"} />

            <div className="p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Office Setting</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Office Image Upload */}
                                <div>
                                    <Label htmlFor="office_image" className="mb-2 block">Office Image</Label>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            id="office_image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData("office_image", e.target.files?.[0] ?? null)}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="office_image"
                                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white text-sm font-medium cursor-pointer hover:bg-primary/90 transition"
                                        >
                                            <Upload className="w-4 h-4" />
                                            Upload Image
                                        </label>
                                        {data.office_image && (
                                            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                {(data.office_image as File).name}
                                            </span>
                                        )}
                                    </div>
                                    {officeSetting.office_image && !data.office_image && (
                                        <img
                                            src={officeSetting.office_image}
                                            alt="Office"
                                            className="mt-2 h-24 rounded border"
                                        />
                                    )}
                                    {errors.office_image && (
                                        <p className="text-sm text-red-500 mt-1">{errors.office_image}</p>
                                    )}
                                </div>

                                {/* Office Cover Upload */}
                                <div>
                                    <Label htmlFor="office_cover" className="mb-2 block">Office Cover</Label>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            id="office_cover"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData("office_cover", e.target.files?.[0] ?? null)}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="office_cover"
                                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white text-sm font-medium cursor-pointer hover:bg-primary/90 transition"
                                        >
                                            <Upload className="w-4 h-4" />
                                            Upload Cover
                                        </label>
                                        {data.office_cover && (
                                            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                {(data.office_cover as File).name}
                                            </span>
                                        )}
                                    </div>
                                    {officeSetting.office_cover && !data.office_cover && (
                                        <img
                                            src={officeSetting.office_cover}
                                            alt="Office Cover"
                                            className="mt-2 h-24 rounded border"
                                        />
                                    )}
                                    {errors.office_cover && (
                                        <p className="text-sm text-red-500 mt-1">{errors.office_cover}</p>
                                    )}
                                </div>

                                {/* Fiscal Year Dropdown */}
                                <div>
                                    <Label htmlFor="fiscal_year_id">Fiscal Year <span className="text-red-500">*</span></Label>
                                    <select
                                        id="fiscal_year_id"
                                        value={data.fiscal_year_id}
                                        onChange={(e) => setData("fiscal_year_id", Number(e.target.value))}
                                        className="w-full border border-input rounded-md p-2"
                                    >
                                        <option value="">Select Fiscal Year</option>
                                        {fiscalYear.map((fy) => (
                                            <option key={fy.id} value={fy.id}>
                                                {fy.fiscal_year}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.fiscal_year_id && (
                                        <p className="text-sm text-red-500">{errors.fiscal_year_id}</p>
                                    )}
                                </div>

                                {/* Input Fields */}
                                <div>
                                    <Label htmlFor="office_name">Office Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="office_name"
                                        value={data.office_name}
                                        onChange={(e) => setData("office_name", e.target.value)}
                                    />
                                    {errors.office_name && <p className="text-sm text-red-500">{errors.office_name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="office_gmail">Email <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id="office_gmail" 
                                        type="email" 
                                        value={data.office_gmail} 
                                        onChange={(e) => setData("office_gmail", e.target.value)} 
                                    />
                                    {errors.office_gmail && <p className="text-sm text-red-500">{errors.office_gmail}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="office_phone">Phone <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id="office_phone" 
                                        value={data.office_phone} 
                                        onChange={(e) => setData("office_phone", e.target.value)} 
                                    />
                                    {errors.office_phone && <p className="text-sm text-red-500">{errors.office_phone}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="office_address">Address <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id="office_address" 
                                        value={data.office_address} 
                                        onChange={(e) => setData("office_address", e.target.value)} 
                                    />
                                    {errors.office_address && <p className="text-sm text-red-500">{errors.office_address}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="fb_url">Facebook</Label>
                                    <Input 
                                        id="fb_url" 
                                        value={data.fb_url} 
                                        onChange={(e) => setData("fb_url", e.target.value)} 
                                    />
                                    {errors.fb_url && <p className="text-sm text-red-500">{errors.fb_url}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="insta_url">Instagram</Label>
                                    <Input 
                                        id="insta_url" 
                                        value={data.insta_url} 
                                        onChange={(e) => setData("insta_url", e.target.value)} 
                                    />
                                    {errors.insta_url && <p className="text-sm text-red-500">{errors.insta_url}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="youtube_url">YouTube</Label>
                                    <Input 
                                        id="youtube_url" 
                                        value={data.youtube_url} 
                                        onChange={(e) => setData("youtube_url", e.target.value)} 
                                    />
                                    {errors.youtube_url && <p className="text-sm text-red-500">{errors.youtube_url}</p>}
                                </div>
                            </div>

                            <div className="flex justify-start">
                                <Button type="submit" disabled={processing}>
                                    {isEdit ? "Update Office Setting" : "Create Office Setting"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}