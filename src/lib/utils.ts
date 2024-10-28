import { clsx, ClassArray } from 'clsx'
import { format } from "date-fns"
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassArray[]) {
  return twMerge(clsx(...inputs))
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-br', {
    style: 'currency', 
    currency: 'BRL' 
  }).format(value)
}

export function formatDate(date: Date) {
  return format(date, "dd/MM/yyyy 'às' HH:mm")
}