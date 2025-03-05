"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Save } from "lucide-react"
import { format } from "date-fns"
import type { SalaryData } from "./finance-manager"

interface SalarySectionProps {
  imamSalary: SalaryData
  mouzanSalary: SalaryData
  onSaveImamSalary: (data: SalaryData) => void
  onSaveMouzanSalary: (data: SalaryData) => void
}

export default function SalarySection({
  imamSalary,
  mouzanSalary,
  onSaveImamSalary,
  onSaveMouzanSalary,
}: SalarySectionProps) {
  const [imam, setImam] = useState<SalaryData>({
    ...imamSalary,
    date: imamSalary.date || format(new Date(), "yyyy-MM-dd"),
    description: imamSalary.description || "Imam Salary",
    amount: imamSalary.amount || 0,
  })
  const [mouzan, setMouzan] = useState<SalaryData>({
    ...mouzanSalary,
    date: mouzanSalary.date || format(new Date(), "yyyy-MM-dd"),
    description: mouzanSalary.description || "Mouzan Salary",
    amount: mouzanSalary.amount || 0,
  })

  // Update local state when props change
  useEffect(() => {
    setImam({
      ...imamSalary,
      date: imamSalary.date || format(new Date(), "yyyy-MM-dd"),
      description: imamSalary.description || "Imam Salary",
      amount: imamSalary.amount || 0,
    })
    setMouzan({
      ...mouzanSalary,
      date: mouzanSalary.date || format(new Date(), "yyyy-MM-dd"),
      description: mouzanSalary.description || "Mouzan Salary",
      amount: mouzanSalary.amount || 0,
    })
  }, [imamSalary, mouzanSalary])

  const handleImamDateChange = (date: Date | undefined) => {
    if (!date) return
    setImam({ ...imam, date: format(date, "yyyy-MM-dd") })
  }

  const handleMouzanDateChange = (date: Date | undefined) => {
    if (!date) return
    setMouzan({ ...mouzan, date: format(date, "yyyy-MM-dd") })
  }

  const handleImamDescriptionChange = (description: string) => {
    setImam({ ...imam, description })
  }

  const handleMouzanDescriptionChange = (description: string) => {
    setMouzan({ ...mouzan, description })
  }

  const handleImamAmountChange = (amount: string) => {
    setImam({ ...imam, amount: Number.parseFloat(amount) || 0 })
  }

  const handleMouzanAmountChange = (amount: string) => {
    setMouzan({ ...mouzan, amount: Number.parseFloat(amount) || 0 })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imam & Mouzan Salary</CardTitle>
        <CardDescription>Record salary payments for Imam and Mouzan</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount (Rs.)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Imam</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {imam.date ? format(new Date(imam.date), "dd MMM yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={imam.date ? new Date(imam.date) : undefined}
                      onSelect={handleImamDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <Input
                  placeholder="Description"
                  value={imam.description}
                  onChange={(e) => handleImamDescriptionChange(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={imam.amount || ""}
                  onChange={(e) => handleImamAmountChange(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => onSaveImamSalary(imam)}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Mouzan</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {mouzan.date ? format(new Date(mouzan.date), "dd MMM yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={mouzan.date ? new Date(mouzan.date) : undefined}
                      onSelect={handleMouzanDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <Input
                  placeholder="Description"
                  value={mouzan.description}
                  onChange={(e) => handleMouzanDescriptionChange(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={mouzan.amount || ""}
                  onChange={(e) => handleMouzanAmountChange(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => onSaveMouzanSalary(mouzan)}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-lg font-semibold">Total Salaries:</div>
        <div className="text-lg font-semibold">Rs. {(imam.amount + mouzan.amount).toLocaleString()}</div>
      </CardFooter>
    </Card>
  )
}

