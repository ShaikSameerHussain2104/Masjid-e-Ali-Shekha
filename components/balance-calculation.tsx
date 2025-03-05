"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"

interface BalanceCalculationProps {
  oldBalance: number
  totalJumaChanda: number
  billBookTotal: number
  totalBeforeExpenses: number
  onSaveOldBalance: (amount: number) => void
}

export default function BalanceCalculation({
  oldBalance,
  totalJumaChanda,
  billBookTotal,
  totalBeforeExpenses,
  onSaveOldBalance,
}: BalanceCalculationProps) {
  const [balance, setBalance] = useState<number>(oldBalance)

  // Update local state when props change
  useEffect(() => {
    setBalance(oldBalance)
  }, [oldBalance])

  const handleSave = () => {
    onSaveOldBalance(balance)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Calculation</CardTitle>
        <CardDescription>Old balance and total balance before expenses & salary</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="old-balance">Old Balance (Previous Month's Balance)</Label>
              <div className="flex space-x-2">
                <Input
                  id="old-balance"
                  type="number"
                  placeholder="Enter old balance"
                  value={balance || ""}
                  onChange={(e) => setBalance(Number.parseFloat(e.target.value) || 0)}
                />
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Total Balance Before Expenses & Salary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Old Balance:</span>
                <span>Rs. {oldBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Jumaon Ka Chanda:</span>
                <span>Rs. {totalJumaChanda.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Chanda from Bill Book:</span>
                <span>Rs. {billBookTotal.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total Balance Before Expenses & Salary:</span>
                <span>Rs. {totalBeforeExpenses.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

