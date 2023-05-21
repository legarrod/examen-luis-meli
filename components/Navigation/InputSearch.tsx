'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import style from '../../styles/navigation.module.scss'
import { useGlobalstore } from '../../storedata/useGlobalstore'
import iconSearch from '../../public/images/ic_Search.png'
import Image from 'next/image'
import { getDefaultProducts } from '../../server/service.getproducts'
import Link from 'next/link'
import { formtaOriginalText } from '../../utils/utils'

const InputSearch = () => {
  const router: any = useRouter()
  const pathName: any = usePathname()
  const {
    productToSearch,
    setProductToSearch,
    getingData,
    setGetingData,
    setpProductList
  } = useGlobalstore()
  const [isLoading, setIsLoading] = useState(true)

  const fnGetdata = useCallback(async () => {
    setGetingData(false)
    const productoList = await getDefaultProducts(productToSearch)
    setpProductList(productoList)
  }, [setGetingData, setpProductList, productToSearch])

  const fnGetKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      const destination =
        productToSearch !== '' ? `/items/${productToSearch}` : '/'
      router.push(destination)
    }
  }

  useEffect(() => {
    if (pathName.includes('/items/') && isLoading) {
      const partes = pathName.split('/')
      const query = partes[partes.length - 1]

      setProductToSearch(formtaOriginalText(query.replaceAll('-', ' ')))
      setIsLoading(false)
    }
  }, [pathName, isLoading, setProductToSearch])

  useEffect(() => {
    if (getingData) {
      fnGetdata()
    }
  }, [getingData, setGetingData, fnGetdata, setProductToSearch, isLoading])

  return (
    <div className={style.inputContainer}>
      <input
        className={style['search-input']}
        value={productToSearch}
        placeholder='Nunca dejes de buscar'
        onChange={(e) => setProductToSearch(e.target.value)}
        onKeyDown={(e) => fnGetKeyPress(e)}
      />
      <Link
        className={style.linkSearch}
        href={`${productToSearch !== '' ? `/items/${productToSearch}` : '/'}`}
      >
        <button>
          <Image src={iconSearch} width={20} height={20} alt='Buscar' />
        </button>
      </Link>
    </div>
  )
}

export default InputSearch
