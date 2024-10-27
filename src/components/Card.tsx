import { Text, View } from 'react-native'
import {
  Card as CardContainer, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from './ui/Card'

type CardProps = {
  title: string
  icon: JSX.Element
  value: string | number
  variant: 'basic' | 'highlighted'
}

const styles = {
  card: {
    basic: 'bg-white border-none shadow-sm',
    highlighted: 'bg-green-400 border-green-400 shadow-sm',
  },
  title: {
    basic: 'text-sm sm:text-md font-medium',
    highlighted: 'text-sm sm:text-md text-gray-100 font-medium'
  },
  value: {
    basic: 'text-xl sm:text-2xl font-bold',
    highlighted: 'text-xl sm:text-2xl font-bold text-gray-100'
  }
} as const

export function Card({ title, icon, value, variant }: CardProps) {
  return (
    <CardContainer className={styles.card[variant]}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={styles.title[variant]}>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>

      <CardContent>
        <Text className={styles.value[variant]}>
          {value}
        </Text>
      </CardContent>
    </CardContainer>
  )
}