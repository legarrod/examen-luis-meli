import style from '../styles/global.module.scss'
import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer/Footer'

export const metadata = {
  title: 'Mercado Libre',
  description: 'Compre productos con Envío Gratis en el día en Mercado Libre Colombia. Encuentre miles de marcas y productos a precios increíbles.',
  openGraph: {
    title: 'Mercado Libre',
    description: 'Compre productos con Envío Gratis en el día en Mercado Libre Colombia. Encuentre miles de marcas y productos a precios increíbles.',
    images: 'https://http2.mlstatic.com/static/org-img/homesnw/mercado-libre.png?v=2',
    url: 'https://www.mercadolibre.com.co/',
    siteName: 'Mercado Libre'
  }
}

export default function RootLayout ({
  children
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={style.body}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
