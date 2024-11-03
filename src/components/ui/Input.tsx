import { forwardRef } from 'react'
import { Text, TextInput, View } from 'react-native'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string
  labelClasses?: string
  inputClasses?: string
  numericOnly?: boolean 
}

const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, inputClasses, numericOnly, ...props }, ref) => (
    <View className={cn('flex flex-col gap-1.5', className)}>
      {label && <Text className={cn('text-base', labelClasses)}>{label}</Text>}
      <TextInput
        ref={ref}
        keyboardType={numericOnly ? 'numeric' : 'default'} 
        onChangeText={text => {
          if (numericOnly) {
            let numericText = text.replace(/[^0-9.,]/g, '')
            
            numericText = numericText.replace(',', '.')
            
            props.onChangeText?.(numericText)
          } else {
            props.onChangeText?.(text)
          }
        }}
        className={cn(
          inputClasses,
          'border border-input py-2.5 px-4 rounded-lg'
        )}
        {...props}
      />
    </View>
  )
)

export { Input }
