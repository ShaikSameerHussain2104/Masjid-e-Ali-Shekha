"use client"

import { CardFooter } from "@/components/ui/card"

import { TableCell } from "@/components/ui/table"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Plus, Save } from "lucide-react"
import { format } from "date-fns"
import type { JumaChanda } from "./finance-manager"

interface JumaonKaChandaProps {
  data: JumaChanda[]
  onSave: (item: JumaChanda) => void
  total: number
}

export default function JumaonKaChanda({ data, onSave, total }: JumaonKaChandaProps) {
  const [newEntries, setNewEntries] = useState<JumaChanda[]>([
    { date: format(new Date(), "yyyy-MM-dd"), description: "", amount: 0 },
  ])

  const hasData = Array.isArray(data) && data.length > 0

  const handleDateChange = (index: number, date: Date | undefined) => {
    if (!date) return

    const updatedEntries = [...newEntries]
    updatedEntries[index].date = format(date, "yyyy-MM-dd")
    setNewEntries(updatedEntries)
  }

  const handleDescriptionChange = (index: number, description: string) => {
    const updatedEntries = [...newEntries]
    updatedEntries[index].description = description
    setNewEntries(updatedEntries)
  }

  const handleAmountChange = (index: number, amount: string) => {
    const updatedEntries = [...newEntries]
    updatedEntries[index].amount = Number.parseFloat(amount) || 0
    setNewEntries(updatedEntries)
  }

  const handleAddRow = () => {
    setNewEntries([...newEntries, { date: format(new Date(), "yyyy-MM-dd"), description: "", amount: 0 }])
  }

  const handleSave = (index: number) => {
    const entry = newEntries[index]
    onSave(entry)

    // Reset the form after saving
    const updatedEntries = [...newEntries]
    updatedEntries[index] = { date: format(new Date(), "yyyy-MM-dd"), description: "", amount: 0 }
    setNewEntries(updatedEntries)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jumaon Ka Chanda (Friday & Special Donations)</CardTitle>
        <CardDescription>Record donations collected on Fridays and special occasions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount (Rs.)</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!hasData && newEntries.length === 1 && newEntries[0].amount === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                    No donations recorded for this month. Add a new entry below.
                  </TableCell>
                </TableRow>
              )}

              {hasData &&
                data.map((item, index) => (
                  <TableRow key={item.id || `saved-${index}`}>
                    <TableCell>{format(new Date(item.date), "dd MMM yyyy")}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.amount.toLocaleString()}</TableCell>
                    <TableCell>Saved</TableCell>
                  </TableRow>
                ))}

              {newEntries.map((entry, index) => (
                <TableRow key={`new-${index}`}>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {entry.date ? format(new Date(entry.date), "dd MMM yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={entry.date ? new Date(entry.date) : undefined}
                          onSelect={(date) => handleDateChange(index, date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Description (e.g., Friday Chanda)"
                      value={entry.description}
                      onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={entry.amount || ""}
                      onChange={(e) => handleAmountChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSave(index)}
                      disabled={!entry.date || entry.amount <= 0}
                    >
                      <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button variant="outline" onClick={handleAddRow}>
            <Plus className="h-4 w-4 mr-1" /> Add Row
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-lg font-semibold">Total Jumaon Ka Chanda:</div>
        <div className="text-lg font-semibold">Rs. {total.toLocaleString()}</div>
      </CardFooter>
    </Card>
  )
}

