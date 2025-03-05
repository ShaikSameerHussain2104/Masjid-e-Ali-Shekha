"use client"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MonthSelectorProps {
  selectedMonth: string
  onMonthChange: (month: string) => void
}

export default function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  // Generate month options for the last 2 years and next 1 year
  const generateMonthOptions = () => {
    const options = []
    const today = new Date()
    const currentYear = today.getFullYear()

    // Generate options for the last 2 years, current year, and next year
    for (let year = currentYear - 2; year <= currentYear + 1; year++) {
      for (let month = 1; month <= 12; month++) {
        const monthStr = month.toString().padStart(2, "0")
        const value = `${year}-${monthStr}`
        const label = new Date(year, month - 1, 1).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })

        options.push({ value, label })
      }
    }

    return options
  }

  const monthOptions = generateMonthOptions()

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-2">
        <Label htmlFor="month-select" className="text-lg font-medium">
          Select Month
        </Label>
        <Select value={selectedMonth} onValueChange={onMonthChange}>
          <SelectTrigger id="month-select" className="w-full md:w-64">
            <SelectValue placeholder="Select a month" />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

