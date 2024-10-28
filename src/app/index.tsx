import { useEffect, useState } from "react"
import { FlatList, Settings, Text, TouchableOpacity, View } from "react-native"
import FeatherIcons from "@expo/vector-icons/Feather"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { SafeAreaView } from "react-native-safe-area-context"
import { DataTable } from "react-native-paper"

import { Card } from "@/components/Card"
import { NewTransactionDialog } from "@/components/NewTransactionDialog"

import { formatDate, formatPrice } from "@/lib/utils"
import { CreateTransaction, Transaction } from "@/types/Transaction"
import { useToast } from "@/components/ui/Toast"

export default function Index() {
  const { toast } = useToast()

  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    async function fetchTransactionInMemory() {
      const transactions = await AsyncStorage.getItem("@finance.app:transactions")

      if (!transactions) return

      setTransactions(JSON.parse(transactions))
    }

    fetchTransactionInMemory()
  }, [])

  const incomeValue = transactions.reduce((acc, transaction) => {
    return transaction.type === "income" ? acc + transaction.value : acc
  }, 0)

  const outcomeValue = transactions.reduce((acc, transaction) => {
    return transaction.type === "outcome" ? acc + transaction.value : acc
  }, 0)

  const balance = incomeValue - outcomeValue

  function handleTransactionCreation (input: CreateTransaction) {
    const transaction: Transaction = {
      transactionId: crypto.randomUUID(),
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

  return (
    <>
      <SafeAreaView className="bg-[#5429cc]">
        <View className="w-full pt-8 px-4 pb-40 flex flex-row items-center justify-between">
          <Text className="block text-xl font-bold text-white">finance.app</Text>

          <NewTransactionDialog
            onCreateTransaction={(input) => handleTransactionCreation(input)}
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
          <DataTable.Row key={item.transactionId}>
            <DataTable.Cell>
              <Text className="text-base">{item.title}</Text>
            </DataTable.Cell>
            <DataTable.Cell>{formatPrice(item.value)}</DataTable.Cell>
            <DataTable.Cell>{item.category}</DataTable.Cell>
            <DataTable.Cell>{formatDate(item.createdAt)}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </>
  )
}


{/* <div className="mt-16 w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.value}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                        >
                          <DotsHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div> */}