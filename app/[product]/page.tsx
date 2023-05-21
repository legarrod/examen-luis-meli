/* eslint-disable react/jsx-closing-tag-location */
import { getProductCode, transformNumber } from '../../utils/utils'
import { getProductById } from '../../server/service.getproducts'
import style from '../../styles/pdp.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'

export async function generateMetadata (
  { params }: { params: { product: string } }
): Promise<Metadata> {
  const { product } = params
  const codeParam = product ? getProductCode(product) : undefined
  const productResponse = await getProductById(codeParam)
  return Promise.resolve({
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
    }
  })
}

const Page = async ({ params }: { params: { product: string } }) => {
  const { product } = params
  const codeParam = product ? getProductCode(product) : ''
  const productResponse = await getProductById(codeParam)
  const item = productResponse?.item

  if (item) {
    return (
      <div className={style.pdpWrapperMain}>
        <Breadcrumb producInformtation={item} />
        <div className={style.pdpMain}>
          <section className={style.pdpPrincipalSection}>
            <div className={style.pdpWtapperImage}>
              <Image
                src={item?.picture || ''}
                width={400}
                height={400}
                alt='Inicio'
                loading='lazy'
              />
            </div>
            <div className={style.pdpBillInformation}>
              <p className={style.pdpInfo}>{item?.condition}</p>
              <h1 className={style.pdpName}>{item?.title}</h1>
              <p className={style.pdpPrice}>$ {transformNumber(item?.price?.amount)}</p>
              <Link className={style.pdpBuyLink} href={`${item?.permalink}`}>
                <button className={style.pdpBuyButton}>Comprar</button>
              </Link>
            </div>
          </section>
          <section className={style.pdpDescriptionSection}>
            <h2 className={style.pdpTittleDescription}>Descripción del producto</h2>
            <p className={style.pdpTextDescription}>{item?.description}</p>
          </section>
        </div>

      </div>

    )
  }
  return null
}

export default Page
