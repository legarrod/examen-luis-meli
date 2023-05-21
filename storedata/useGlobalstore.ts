import { create } from 'zustand'

export const useGlobalstore = create((set: any) => {
  return {
    productToSearch: '',
    setProductToSearch: (newstate: string) => set({ productToSearch: newstate }),
    getingData: true,
    setGetingData: (newstate: boolean) => set({ getingData: newstate }),
    productList: { results: [] },
    setpProductList: (newstate: any) => set({ productList: newstate })
  }
})
