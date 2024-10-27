import { clsx, ClassArray } from 'clsx'
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