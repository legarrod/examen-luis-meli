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
import Cookies from 'js-cookie'

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
  const [getResult, setgetResult] = useState('/#')

  const fnGetdata = useCallback(async () => {
    setGetingData(false)
    const productoList = await getDefaultProducts(productToSearch)
    setpProductList(productoList)
  }, [setGetingData, setpProductList, productToSearch])

  const fnGetKeyPress = (e: any) => {
    if (e.key === 'Enter' && productToSearch !== '') {
      const destination =
        productToSearch !== '' ? `/items/${productToSearch}` : '/'
      router.push(destination)
    }
  }

  const handlerChangeInput = (value: string) => {
    setProductToSearch(value)
    Cookies.set('searchText', value, { expires: 1 })
  }

  useEffect(() => {
    if (pathName.includes('/items/')) {
      const partes = pathName.split('/')
      const query = partes[partes.length - 1]
      const lastSlashIndex = pathName.lastIndexOf('/')
      setProductToSearch(formtaOriginalText(query.replaceAll('-', ' ')))
      setIsLoading(false)
      if (lastSlashIndex !== -1 && lastSlashIndex < pathName.length - 1) {
        setgetResult(`/items/${pathName.substring(lastSlashIndex + 1)}`)
      }
    } else {
      const lastSlashIndex = pathName.lastIndexOf('/')
      if (lastSlashIndex !== -1 && lastSlashIndex < pathName.length - 1) {
        setgetResult(`/${pathName.substring(lastSlashIndex + 1)}`)
      }
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
        onChange={(e) => handlerChangeInput(e.target.value)}
        onKeyDown={(e) => fnGetKeyPress(e)}
      />
      <Link
        className={style.linkSearch}
        href={`${productToSearch !== '' ? `/items/${productToSearch}` : getResult}`}
      >
        <button>
          <Image src={iconSearch} width={20} height={20} alt='Buscar' />
        </button>
      </Link>
    </div>
  )
}

export default InputSearch
