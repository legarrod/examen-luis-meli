'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import style from '../../styles/breadcrumb.module.scss'
import { replaceLink, formtaOriginalText } from '../../utils/utils'
import { useGlobalstore } from '../../storedata/useGlobalstore'
import Cookies from 'js-cookie'

const Breadcrumb = ({ producInformtation }: any) => {
  const { breadcrumbSearch, setBreadcrumbSearch } = useGlobalstore()
  const pathName: any = usePathname()
  const partes = pathName.split('/')
  const query = partes[partes.length - 1]
  const storedSearchText: string | undefined = Cookies.get('searchText')

  useEffect(() => {
    if (pathName.includes('/items/') === false) {
      setBreadcrumbSearch(`/items/${storedSearchText}`)
    } else {
      setBreadcrumbSearch('/')
    }
  }, [pathName, storedSearchText, setBreadcrumbSearch])

  return (
    <div className={style.wrapperBreadcrumb}>
      <Link href={`${breadcrumbSearch}`}>Inicio</Link>
      <Link href={`/items/${replaceLink(producInformtation?.categories[0])}`}>{`${producInformtation?.categories[0] && ` > ${producInformtation?.categories[0]}`}`}</Link>
      <Link href={`/${query}`}>{` > ${producInformtation?.categories[0] !== formtaOriginalText(query.replaceAll('-', ' ')) && formtaOriginalText(query.replaceAll('-', ' '))}`}</Link>
    </div>
  )
}

export default Breadcrumb
