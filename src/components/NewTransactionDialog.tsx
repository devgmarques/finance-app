
import { useState } from 'react'

import { Alert, Text, View } from 'react-native'

import { Picker } from '@react-native-picker/picker'

import { Transaction, TransactionType } from "@/types/transaction"

import { Input } from "./ui/Input"
import { Button } from "./ui/Button"

import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "./ui/Dialog"

type NewTransactionDialogProps = {
  onCreateTransaction(input: Transaction): void
}

export function NewTransactionDialog({
  onCreateTransaction
}: NewTransactionDialogProps) {
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

    const transaction: Transaction = {
      title,
      type,
      value,
      category,
      createdAt: new Date(),
    }

    onCreateTransaction(transaction)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className='bg-[#6933ff] w-44 h-12 hover:bg-[#6933ff] hover:brightness-90'
          label="Nova transação"
          labelClasses="text-white"
        />
      </DialogTrigger>

      <DialogContent className="bg-white">
        <View>
          <Text className="text-lg font-semibold leading-none tracking-tight">Criar transação</Text>

          <Text className="text-sm text-muted-foreground">
            Adicione uma nova transação para organizar as suas finanças
          </Text>
        </View>

        <View className="space-y-4 py-2 pb-4">
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

          <Picker 
            onValueChange={(value) => setType(value as TransactionType)}
          >
            <Picker.Item label="Entrada" value="income" />
            <Picker.Item label="Saída" value="outcome" />
          </Picker>

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
    </Dialog>
  )
}