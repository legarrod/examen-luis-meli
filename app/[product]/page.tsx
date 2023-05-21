/* eslint-disable react/jsx-closing-tag-location */
import { getProductCode, transformNumber } from '../../utils/utils'
import { getProductById } from '../../server/service.getproducts'
import style from '../../styles/pdp.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata (
  { params }: { params: { product: string } },
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const { product } = params
  const codeParam = product ? getProductCode(product) : undefined
  const productResponse = await getProductById(codeParam)
  return {
    title: productResponse?.item?.title,
    description: productResponse?.item?.description?.substring(0, 160).toLowerCase() || productResponse?.item?.title,
    openGraph: {
      title: productResponse?.item?.title,
      description: productResponse?.item?.description?.substring(0, 160).toLowerCase() || productResponse?.item?.title,
      images: productResponse?.item?.thumbnail,
      url: productResponse?.item?.permalink,
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

const Page = async ({ params }: { params: { product: string } }) => {
  const { product } = params
  const codeParam = product ? getProductCode(product) : undefined
  const productResponse = await getProductById(codeParam)

  return (
    <div className={style.pdpMain}>
      <section className={style.pdpPrincipalSection}>
        <div className={style.pdpWtapperImage}>
          <Image
            src={productResponse?.item?.picture || ''}
            width={400}
            height={400}
            alt='Inicio'
            loading='lazy'
          />
        </div>
        <div className={style.pdpBillInformation}>
          <p className={style.pdpInfo}>{productResponse?.item?.condition}</p>
          <h1 className={style.pdpName}>{productResponse?.item?.title}</h1>
          <p className={style.pdpPrice}>$ {transformNumber(productResponse?.item?.price?.amount)}</p>
          <Link className={style.pdpBuyLink} href={`${productResponse?.item?.permalink}`}>
            <button className={style.pdpBuyButton}>Comprar</button>
          </Link>
        </div>
      </section>
      <section className={style.pdpDescriptionSection}>
        <h2 className={style.pdpTittleDescription}>Descripción del producto</h2>
        <p className={style.pdpTextDescription}>{productResponse?.item?.description}</p>
      </section>

    </div>
  )
}

export default Page
