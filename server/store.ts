'use client'
import { useGlobalstore } from '../storedata/useGlobalstore'
// eslint-disable-next-line react-hooks/rules-of-hooks
const { productToSearch } = useGlobalstore()
export {
  productToSearch
}
