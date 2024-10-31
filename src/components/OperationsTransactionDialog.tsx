
import { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { 
  CreateTransaction, 
  DeleteTransaction, 
  Transaction, 
  TransactionType, 
  UpdateTransaction 
} from "@/types/Transaction"

import { Input } from "./ui/Input"
import { Button } from "./ui/Button"
import { DialogContent } from "./ui/Dialog"
import AsyncStorage from '@react-native-async-storage/async-storage'

type OperationsTransactionDialogProps = {
  transactionId: string
  onUpdateTransaction(input: Transaction): void
  onDeleteTransaction(input: DeleteTransaction): void
}

export function OperationsTransactionDialog({
  transactionId,
  onUpdateTransaction,
  onDeleteTransaction
}: OperationsTransactionDialogProps) {
  const [title, setTitle] = useState("")
  const [value, setValue] = useState<number>(0)
  const [type, setType] = useState<TransactionType>("income")
  const [category, setCategory] = useState("")

  async function deleteTransaction() {
    const transactionsJson = await AsyncStorage.getItem("@finance.app:transactions")
    const transactions = JSON.parse(transactionsJson!) as Transaction[]

    const transactionById =  
      transactions.find(item => item.transactionId === transactionId)

    if(!transactionById) {
      Alert.alert("Esta transação não existe")

      return
    }  

    const transactionsDeleteById = transactions.filter(item => item.transactionId !== transactionId)
    onDeleteTransaction({ transactions: transactionsDeleteById })
  }

  async function updateTransaction() {
    const transactionsJson = await AsyncStorage.getItem("@finance.app:transactions")
    const transactions = JSON.parse(transactionsJson!) as Transaction[]

    const transactionById =  
      transactions.find(item => item.transactionId === transactionId)

    if(!transactionById) {
      Alert.alert("Esta transação não existe")

      return
    }  

    const transaction: UpdateTransaction = {
      transactionId,
      type
    }

    if(title !== "") {
      transaction.title = title
    }
    if(value !== 0) {
      transaction.value = value
    }
    if(category !== "") {
      transaction.category = category
    }

    Object.assign(transactionById, transaction)

    onUpdateTransaction(transactionById)
  }

  return (
    <DialogContent className="bg-white">
      <View className='space-y-2'>
        <Text className="text-lg font-semibold leading-none tracking-tight">Editar ou deletar transação</Text>

        <Text className="text-sm text-muted-foreground">
          Edite sua transação ou delete para organizar as suas finanças
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

      <View className="flex flex-row justify-end gap-5">
        <Button 
          label="Deletar" 
          labelClasses="text-white" 
          className="bg-[#ee5e5e] text-white hover:bg-[#ee5e5e]/90" 
          variant='destructive'
          onPress={deleteTransaction}
        />

        <Button 
          label="Editar" 
          labelClasses="text-white" 
          className="bg-[#5429cc] text-white hover:bg-[#5429cc]/90" 
          onPress={updateTransaction}
        />
      </View>
    </DialogContent>
  )
}