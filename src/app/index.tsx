import { Text, View } from "react-native"
import FeatherIcons from '@expo/vector-icons/Feather'

import { SafeAreaView } from 'react-native-safe-area-context'

import { Card } from "@/components/Card"
import { NewTransactionDialog } from "@/components/NewTransactionDialog"

import { formatPrice } from "@/lib/utils"

export default function Index() {
  return (
    <>
      <SafeAreaView className="bg-[#5429cc]">
        <View className='w-full pt-8 px-4 pb-40 flex flex-row items-center justify-between'>
          <Text className='block text-xl font-bold text-white'>finance.app</Text>

          <NewTransactionDialog
            onCreateTransaction={(input) => console.log(input)}
          />
        </View>
      </SafeAreaView>

      <View className='px-4 py-10'>
        <View className='grid grid-cols-3 gap-3 mt-[-10rem]'>
          <Card
            title='Entradas' 
            icon={<FeatherIcons name="arrow-up-circle" className='h-5 w-5 text-green-500' />}
            value={formatPrice(10)}
            variant='basic'
          />

          <Card
            title='Saídas' 
            icon={<FeatherIcons name="arrow-down-circle" className='h-5 w-5 text-red-500' />}
            value={formatPrice(10)}
            variant='basic'
          />

          <Card
            title='Saldo' 
            icon={<FeatherIcons name="dollar-sign" className='h-5 w-5 text-white' />}
            value={formatPrice(10)}
            variant='highlighted'
          />
        </View>
      </View>
    </>
  )
}


{/* <div className='mt-16 w-full'>
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