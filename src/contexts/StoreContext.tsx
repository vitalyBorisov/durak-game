'use client'

import RootStore from '@/store'
import { createContext, PropsWithChildren } from 'react'

let store: RootStore
export const StoreContext = createContext<RootStore>({} as RootStore)

function initializeStore() {
  const _store = store ?? new RootStore()

  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function StoreProvider({ children }: PropsWithChildren) {
  const store = initializeStore()

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
