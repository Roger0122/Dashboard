export type ExpenseCategory = 'food' | 'living' | 'entertainment' | 'transport' | 'stay' | 'other'

export interface MonthlyExpense {
  dateKey: string // YYYY-MM

  year: number
  month: number // 1-12

  total: number // 總計

  breakdown: Partial<Record<ExpenseCategory, number>>
  meta?: {
    days?: number
    updateAt?: string
  }
}
