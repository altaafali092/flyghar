"use client"

import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, } from "@/components/ui/card"
import { BreadcrumbItem } from "@/types"
import { Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Staff } from "@/types/admin/Staff"

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Staff", href: route("staff.index") },
    // { title: "Edit", href: route("staff.create") },
]

const genderOptions = {
    male: "Male",
    female: "Female",
    other: "Other",
}
interface StaffProps {
    staff: Staff
}


export default function StaffEdit({ staff }: StaffProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: staff.name || "",
        email: staff.email || "",
        phone: staff.phone || "",
        address: staff.address || "",
        remark: staff.remark || "",
        position: staff.position || "",
        gender: staff.gender || "",
        date_of_birth: staff.date_of_birth?.slice(0, 10) || "",
        image: null as File | null,


    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('staff.update', staff.id)); // This sends a PUT request
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Udate Staff" />
            <div className=" p-6">
                <Card className="rounded-2xl shadow-sm border border-border bg-card">
                    <CardContent>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Inside your form */}
                                <div >
                                    <Label htmlFor="image" className="mb-2 block">
                                        Profile Image
                                    </Label>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData("image", e.target.files?.[0] ?? null)}
                                            className="hidden"
                                        />

                                        <label
                                            htmlFor="image"
                                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white text-sm font-medium cursor-pointer hover:bg-primary/90 transition"
                                        >
                                            <Upload className="w-4 h-4" />
                                            Upload Image
                                        </label>
                                        {data.image && (
                                            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                {data.image.name}
                                            </span>
                                        )}
                                    </div>

                                    {errors.image && (
                                        <p className="text-sm text-red-500 mt-1">{errors.image}</p>
                                    )}
                                </div>


                                <div>
                                    <Label htmlFor="name">Name  <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="gender">
                                        Gender <span className="text-red-500">*</span>
                                    </Label>

                                    <Select
                                        value={data.gender}
                                        onValueChange={(value) => setData("gender", value)}
                                    >
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(genderOptions).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {errors.gender && (
                                        <p className="text-sm text-red-500">{errors.gender}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="name">Date of Birth(DOB)  <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="date_of_birth"
                                        value={data.date_of_birth}
                                        type="date"
                                        onChange={(e) => setData("date_of_birth", e.target.value)}
                                        placeholder="2080/09/09"
                                    />
                                    {errors.date_of_birth && <p className="text-sm text-red-500">{errors.date_of_birth}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email  <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone  <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData("phone", e.target.value)}
                                        placeholder="+977 9800000000"
                                    />
                                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                </div>

                                <div >
                                    <Label htmlFor="address">Address  <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData("address", e.target.value)}
                                        placeholder="Enter full address"
                                    />
                                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="position">Position <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="position"
                                        value={data.position}
                                        onChange={(e) => setData("position", e.target.value)}
                                        placeholder="Manager"
                                    />
                                    {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
                                </div>


                                <div className="md:col-span-2">
                                    <Label htmlFor="remark">Remark</Label>
                                    <Textarea
                                        id="remark"
                                        value={data.remark}
                                        onChange={(e) => setData("remark", e.target.value)}
                                        placeholder="Notes about this staff member"
                                    />
                                    {errors.remark && <p className="text-sm text-red-500">{errors.remark}</p>}
                                </div>


                            </div>

                            <div className="flex justify-start">
                                <Button type="submit" disabled={processing}>
                                    Update Staff
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
