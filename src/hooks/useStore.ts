import { StoreContext } from '@/contexts/StoreContext'
import { useContext } from 'react'

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within RootStoreProvider')
  }

  return context
}
