import { useState } from 'react'

import { Alert, Text, View } from 'react-native'

import { Picker } from '@react-native-picker/picker'

import { CreateTransaction, TransactionType } from "@/types/Transaction"

import { Input } from "./ui/Input"
import { Button } from "./ui/Button"

import { 
  DialogContent, 
  useDialog
} from "./ui/Dialog"

type NewTransactionDialogProps = {
  onCreateTransaction(input: CreateTransaction): void
}

export function NewTransactionDialog({
  onCreateTransaction
}: NewTransactionDialogProps) {
  const { setOpen } = useDialog()

  const [title, setTitle] = useState('')
  const [value, setValue] = useState<number>(0)
  const [type, setType] = useState<TransactionType>("income")
  const [category, setCategory] = useState('')

  function createTransaction() {
    if (title === "") {
      return Alert.alert("O campo titulo não pode estar vazio")
    }

    if (value === 0) {
      return Alert.alert("O campo preço não pode zerado")
    }

    if (category === "") {
      return Alert.alert("O campo categoria não pode estar vazio")
    }

    const transaction: CreateTransaction = {
      title,
      type,
      value,
      category,
      createdAt: new Date(),
    }

    setOpen(false)
    onCreateTransaction(transaction)
  }

  return (
    <DialogContent className="bg-white">
      <View className='space-y-2'>
        <Text className="text-lg font-semibold leading-none tracking-tight">Criar transação</Text>

        <Text className="text-sm text-muted-foreground">
          Adicione uma nova transação para organizar as suas finanças
        </Text>
      </View>

      <View className="space-y-5 py-4">
        <Input
          label="Título"
          id="title"
          placeholder="Netflix"
          onChangeText={value => setTitle(value)}
        />

        <Input
          id="price"
          label="Preço"
          placeholder="49.99"
          onChangeText={value => setValue(Number(value))}
        />

        <View>
          <Text className="text-base">Tipo</Text>

          <Picker 
            onValueChange={(value) => setType(value as TransactionType)}
            selectedValue={type}
          >
            <Picker.Item label="Entrada" value="income" />
            <Picker.Item label="Saída" value="outcome" />
          </Picker>
        </View>

        <Input
          label="Categoria"
          id="category"
          placeholder="Entretenimento"
          onChangeText={(value) => setCategory(value)}
        />
      </View>

      <Button 
        label="Criar" 
        labelClasses="text-white" 
        className="bg-[#5429cc] text-white hover:bg-[#5429cc]/90" 
        onPress={createTransaction}
      />
    </DialogContent>
  )
}