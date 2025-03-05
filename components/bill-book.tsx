"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { BillBookData } from "./finance-manager"
import { Save } from "lucide-react"

interface BillBookProps {
  data: BillBookData
  onSave: (data: BillBookData) => void
}

export default function BillBook({ data, onSave }: BillBookProps) {
  const [billBookData, setBillBookData] = useState<BillBookData>(data)

  // Update local state when props change
  useEffect(() => {
    setBillBookData(data)
  }, [data])

  const handleChange = (field: keyof BillBookData, value: string) => {
    setBillBookData({
      ...billBookData,
      [field]: field === "total_chanda" ? Number.parseFloat(value) || 0 : Number.parseInt(value) || 0,
    })
  }

  const handleSave = () => {
    onSave(billBookData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill Book Number & Total Chanda Received</CardTitle>
        <CardDescription>Record bill book numbers and total donations received</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bill-from">Bill Book From</Label>
            <Input
              id="bill-from"
              type="number"
              placeholder="Starting number"
              value={billBookData.from || ""}
              onChange={(e) => handleChange("from", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bill-to">Bill Book To</Label>
            <Input
              id="bill-to"
              type="number"
              placeholder="Ending number"
              value={billBookData.to || ""}
              onChange={(e) => handleChange("to", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bill-total">Total Chanda Received (Rs.)</Label>
            <Input
              id="bill-total"
              type="number"
              placeholder="Total amount"
              value={billBookData.total_chanda || ""}
              onChange={(e) => handleChange("total_chanda", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" /> Save Bill Book Data
        </Button>
      </CardFooter>
    </Card>
  )
}

