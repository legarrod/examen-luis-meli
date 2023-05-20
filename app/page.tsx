/* eslint-disable react/jsx-closing-tag-location */
import style from '../styles/home.module.scss'
import Image from 'next/image'
import { getDefaultProducts } from '../server/service.getproducts'
import { transformNUmber } from '../utils/utils'

export default async function Home () {
  const productoList = await getDefaultProducts()
  return (
    <main className={style.main}>
      <p>Home</p>
      <div className={style.cardContainer}>
        {productoList?.results.length &&
          productoList?.results.map((product: any) => (
            <div key={product?.id} className={style.card}>
              <div className={style.cardImageSection}>
                <Image
                  src={product?.thumbnail}
                  width={180}
                  height={180}
                  alt='Inicio'
                  loading='lazy'
                />
              </div>
              <div className={style.cardInformationSection}>
                <div className={style.cardTitleSection}>
                  <p className={style.plpCardPrice}>$ {transformNUmber(product?.price)}</p>
                  <p className={style.plpCardExtra}>{product?.address?.state_name}</p>
                </div>
                <h2 className={style.plpCardTitle}>{product?.title}</h2>
              </div>
            </div>
          ))}
      </div>
    </main>
  )
}
