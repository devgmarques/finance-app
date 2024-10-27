import { Slot } from "expo-router"
import "./globals.css"

import { ToastProvider } from "@/components/ui/Toast"

export default function RootLayout() {
  return (
    <ToastProvider position="bottom">
      <Slot />
    </ToastProvider> 
  )
}
