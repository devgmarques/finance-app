export type TransactionType = 'income' | 'outcome'

export type Transaction = {
  transactionId: string
  title: string
  value: number
  category: string
  type: TransactionType
  createdAt: Date
}

export type CreateTransaction = {
  title: string
  value: number
  category: string
  type: TransactionType
  createdAt: Date
}

export type UpdateTransaction = {
  transactionId: string
  title?: string
  value?: number
  category?: string
  type?: TransactionType
}

export type DeleteTransaction = {
  transactions: Transaction[]
}