import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import FeatherIcons from "@expo/vector-icons/Feather"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { SafeAreaView } from "react-native-safe-area-context"
import { DataTable } from "react-native-paper"

import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

import { Card } from "@/components/Card"
import { NewTransactionDialog } from "@/components/NewTransactionDialog"

import { formatDate, formatPrice } from "@/lib/utils"
import { CreateTransaction, DeleteTransaction, Transaction, UpdateTransaction } from "@/types/Transaction"
import { useToast } from "@/components/ui/Toast"
import { Dialog, DialogTrigger } from "@/components/ui/Dialog"
import { OperationsTransactionDialog } from "@/components/OperationsTransactionDialog"

export default function Index() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    async function fetchTransactionInMemory() {
      const transactions = await AsyncStorage.getItem("@finance.app:transactions")

      if (!transactions) return

      setTransactions(JSON.parse(transactions))
    }

    fetchTransactionInMemory()
  }, [])
  
  const { toast } = useToast()

  const incomeValue = transactions.reduce((acc, transaction) => {
    return transaction.type === "income" ? acc + transaction.value : acc
  }, 0)

  const outcomeValue = transactions.reduce((acc, transaction) => {
    return transaction.type === "outcome" ? acc + transaction.value : acc
  }, 0)

  const balance = incomeValue - outcomeValue

  function handleTransactionCreate (input: CreateTransaction) {
    const transaction: Transaction = {
      transactionId: uuidv4(),
      ...input
    }
    const transactionsToSave = [transaction, ...transactions]

    AsyncStorage.setItem(
      "@finance.app:transactions", 
      JSON.stringify(transactionsToSave)
    )
    setTransactions(transactionsToSave)

    toast("Transação criada com sucesso", "success", 4000)
  }

  async function handleTransactionUpdate (input: Transaction) {
    const transactionsJson = await AsyncStorage.getItem("@finance.app:transactions")
    const transactions = JSON.parse(transactionsJson!) as Transaction[]

    const transactionsWithNewValue = 
      transactions.map(item => item.transactionId === input.transactionId ? input : item)

    AsyncStorage.setItem(
      "@finance.app:transactions", 
      JSON.stringify(transactionsWithNewValue)
    )
    setTransactions(transactionsWithNewValue)

    toast("Transação editada com sucesso", "success", 4000)
  }

  async function handleTransactionDelete (input: DeleteTransaction) {
    AsyncStorage.setItem(
      "@finance.app:transactions", 
      JSON.stringify(input.transactions)
    )
    setTransactions(input.transactions)

    toast("Transação deletada com sucesso", "success", 4000)
  }

  return (
    <>
      <SafeAreaView className="bg-[#5429cc]">
        <View className="w-full pt-8 px-4 pb-40 flex flex-row items-center justify-between">
          <Text className="block text-xl font-bold text-white">finance.app</Text>

          <NewTransactionDialog
            onCreateTransaction={(input) => handleTransactionCreate(input)}
          />
        </View>
      </SafeAreaView>

      <View className="px-4 py-10">
        <View className="grid grid-cols-3 gap-3 mt-[-10rem]">
          <Card
            title="Entradas" 
            icon={<FeatherIcons name="arrow-up-circle" className="h-5 w-5 text-green-500" />}
            value={formatPrice(incomeValue)}
            variant="basic"
          />

          <Card
            title="Saídas" 
            icon={<FeatherIcons name="arrow-down-circle" className="h-5 w-5 text-red-500" />}
            value={formatPrice(outcomeValue)}
            variant="basic"
          />

          <Card
            title="Saldo" 
            icon={<FeatherIcons name="dollar-sign" className="h-5 w-5 text-white" />}
            value={formatPrice(balance)}
            variant="highlighted"
          />
        </View>
      </View>

      <DataTable className="px-4">
        <DataTable.Header>
          <DataTable.Title>Título</DataTable.Title>
          <DataTable.Title>Valor</DataTable.Title>
          <DataTable.Title>Categoria</DataTable.Title>
          <DataTable.Title>Data</DataTable.Title>
        </DataTable.Header>

        {transactions.map((item) => (
          <Dialog>
            <DialogTrigger>
              <DataTable.Row 
                key={item.transactionId} 
              >
                <DataTable.Cell>{item.title}</DataTable.Cell>
                <DataTable.Cell>{formatPrice(item.value)}</DataTable.Cell>
                <DataTable.Cell>{item.category}</DataTable.Cell>
                <DataTable.Cell>{formatDate(item.createdAt)}</DataTable.Cell>
              </DataTable.Row>
            </DialogTrigger>

            <OperationsTransactionDialog 
              onDeleteTransaction={({ transactions }) => handleTransactionDelete({ transactions })} 
              onUpdateTransaction={(transaction) => handleTransactionUpdate(transaction)}
              transactionId={item.transactionId}
            />
          </Dialog>
        ))}
      </DataTable>
    </>
  )
}