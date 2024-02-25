'use client'
import React from 'react'
import {SessionProvider} from 'next-auth/react'
import { FC } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
interface ProviderProps {
    children: React.ReactNode}
const Provider: FC<ProviderProps> = ({children}) => {
   const queryClient = new QueryClient() 
  return (
        <QueryClientProvider client={queryClient}>
  <SessionProvider>{children}</SessionProvider>
  </QueryClientProvider>
  )
}

export default Provider
