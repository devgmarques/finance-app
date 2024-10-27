export type TransactionType = 'income' | 'outcome'

export type Transaction = {
  title: string
  value: number
  category: string
  type: TransactionType
  createdAt: Date
}