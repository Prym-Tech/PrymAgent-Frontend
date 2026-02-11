"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import api from "@/lib/api"

export default function ProfilePage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        bank_name: '',
        account_name: '',
        account_number: ''
    })

    useEffect(() => {
        // Fetch current user details
        const fetchProfile = async () => {
            try {
                // Mock or real endpoint
                // const res = await api.get('/auth/me') 
                // setFormData(res.data)
            } catch (e) { }
        }
        fetchProfile()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            // await api.put('/auth/me', formData)
            alert("Bank details saved successfully! (Mock)")
        } catch (e) {
            console.error("Save failed", e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="p-6 md:p-10 space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Bank Details</CardTitle>
                    <CardDescription>
                        These details will appear on your generated invoices.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bank_name">Bank Name</Label>
                        <Input id="bank_name" name="bank_name" placeholder="e.g. GTBank" value={formData.bank_name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="account_name">Account Name</Label>
                        <Input id="account_name" name="account_name" placeholder="e.g. Prym Tech" value={formData.account_name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="account_number">Account Number</Label>
                        <Input id="account_number" name="account_number" placeholder="0123456789" value={formData.account_number} onChange={handleChange} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}
