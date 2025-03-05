"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalculatorIcon } from "lucide-react"

interface FinalBalanceProps {
  totalBeforeExpenses: number
  totalExpenses: number
  imamSalary: number
  mouzanSalary: number
  finalBalance: number
  onCalculateAndSave: () => void
}

export default function FinalBalance({
  totalBeforeExpenses,
  totalExpenses,
  imamSalary,
  mouzanSalary,
  finalBalance,
  onCalculateAndSave,
}: FinalBalanceProps) {
  const totalSalaries = imamSalary + mouzanSalary
  const totalDeductions = totalExpenses + totalSalaries

  return (
    <Card className="bg-primary/5">
      <CardHeader>
        <CardTitle>Final Balance Calculation</CardTitle>
        <CardDescription>Final balance after deducting all expenses and salaries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-background p-4 rounded-md">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Balance Before Expenses & Salary:</span>
                <span>Rs. {totalBeforeExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Total Expenses:</span>
                <span>- Rs. {totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Imam Salary:</span>
                <span>- Rs. {imamSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Mouzan Salary:</span>
                <span>- Rs. {mouzanSalary.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span>Total Deductions:</span>
                <span>Rs. {totalDeductions.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 p-6 rounded-md">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Final Balance:</h3>
              <span className="text-2xl font-bold">Rs. {finalBalance.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onCalculateAndSave}>
          <CalculatorIcon className="h-4 w-4 mr-1" /> Calculate & Save Final Balance
        </Button>
      </CardFooter>
    </Card>
  )
}

