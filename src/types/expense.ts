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

export const CATEGORY_LABEL = {
  food: '食物',
  living: '生活',
  entertainment: '娛樂',
  transport: '交通',
  other: '其他'
}