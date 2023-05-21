'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import style from '../../styles/breadcrumb.module.scss'
import { replaceLink, formtaOriginalText } from '../../utils/utils'

const Breadcrumb = ({ producInformtation }: any) => {
  const pathName: any = usePathname()
  const partes = pathName.split('/')
  const query = partes[partes.length - 1]

  return (
    <div className={style.wrapperBreadcrumb}>
      <Link href='/'>Inicio</Link>
      <Link href={`/items/${replaceLink(producInformtation?.categories[0])}`}>{`${producInformtation?.categories[0] && ` | ${producInformtation?.categories[0]}`}`}</Link>
      <Link href={`/items/${query}`}>{` | ${producInformtation?.categories[0] !== formtaOriginalText(query.replaceAll('-', ' ')) && formtaOriginalText(query.replaceAll('-', ' '))}`}</Link>
    </div>
  )
}

export default Breadcrumb
