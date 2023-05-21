/* eslint-disable react/jsx-closing-tag-location */
import style from '../styles/home.module.scss'
import { getDefaultProducts } from '../server/service.getproducts'
import Image from 'next/image'
import Link from 'next/link'
import { replaceLink } from '../utils/utils'

export default async function Home () {
  const productList = await getDefaultProducts('query')

  return (
    <main className={style.main}>
      <p>Más vendidos</p>
      <div className={style.cardContainer}>
        {productList?.items &&
          productList?.items?.map((product: any) => (
            <div key={product?.id} className={style.card}>
              <Link className={style.plpCardLink} href={`/${replaceLink(product?.title)}-${product?.id}`}>
                <Image
                  src={product?.picture}
                  width={100}
                  height={100}
                  alt='Inicio'
                  loading='lazy'
                />
              </Link>
            </div>
          ))}
      </div>
      <div>
        <p>Aún no hay resultados de búsqueda</p>
      </div>
    </main>
  )
}
