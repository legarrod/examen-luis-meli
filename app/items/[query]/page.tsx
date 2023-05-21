/* eslint-disable react/jsx-closing-tag-location */
import { Suspense } from 'react'
import { transformNumber, replaceLink } from '../../../utils/utils'
import { getDefaultProducts } from '../../../server/service.getproducts'
import style from '../../../styles/searchresult.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb'

export async function generateMetadata (
  { params }: { params: { query: string } }
): Promise<Metadata> {
  const { query } = params

  return {
    title: `Aquí tienes toda la información referente al producto ${query}`,
    openGraph: {
      title: `Aquí tienes toda la información referente al producto ${query}`,
      description: 'Encuentra una amplia selección de productos de alta calidad y precios competitivos en nuestra tienda en línea. Descubre las últimas tendencias en tecnología, moda, hogar y mucho más. Envío rápido y seguro. ¡Explora nuestro catálogo y encuentra lo que necesitas hoy mismo',
      siteName: 'Mercado Libre'
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' }
    ]
  }
}

const Page = async ({ params }: { params: any }) => {
  const { query } = params
  const productList = await getDefaultProducts(query)

  return (
    <main className={style.main}>
      <Breadcrumb producInformtation={productList} />
      <Suspense fallback={<p>Loading feed...</p>}>
        <div className={style.cardContainer}>
          {productList?.items?.length
            ? productList?.items.map((product: any) => (
              <div key={product?.id} className={style.card}>
                <div className={style.cardImageSection}>
                  <Link className={style.plpCardLink} href={`/${replaceLink(product?.title)}-${product?.id}`}>
                    <Image
                      src={product?.picture}
                      width={180}
                      height={180}
                      alt='Inicio'
                      loading='lazy'
                    />
                  </Link>
                </div>
                <div className={style.cardInformationSection}>
                  <div className={style.cardTitleSection}>
                    <p className={style.plpCardPrice}>$ {transformNumber(product?.price?.amount)}</p>
                    <p className={style.plpCardExtra}>{product?.address?.state_name}</p>
                  </div>
                  <Link className={style.plpCardLink} href={`/${replaceLink(product?.title)}-${product?.id}`}>
                    <h2 className={style.plpCardTitle}>{product?.title}</h2>
                  </Link>
                </div>
              </div>
            ))
            : <div>
              <p>No hay resultados de busqueda</p>
            </div>}
        </div>
      </Suspense>
    </main>
  )
}

export default Page
