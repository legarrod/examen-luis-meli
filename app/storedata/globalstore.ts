import { create } from 'zustand'

export const useBearStore = create((set) => ({
  productToSearch: '',
  setProductToSearch: () => set((state: string) => ({ productToSearch: state }))
}))
