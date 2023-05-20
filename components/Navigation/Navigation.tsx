import React from 'react'
import style from '../../styles/navigation.module.scss'
import Image from 'next/image'
import logo from '../../public/images/Logo_ML.png'
import iconSearch from '../../public/images/ic_Search.png'
import Link from 'next/link'

const Navigation = () => {
  const homeLink: string = '/'

  return (
    <nav className={style.navigationBar}>
      <div className={style.navigationContainer}>
        <div className={style.logoContainer}>
          <Link href={homeLink}>
            <Image
              src={logo}
              width={54}
              height={34}
              alt='Inicio'
            />
          </Link>
        </div>
        <div className={style.inputContainer}>
          <input className={style['search-input']} placeholder='Nunca dejes de buscar' />
          <button>
            <Image
              src={iconSearch}
              width={20}
              height={20}
              alt='Buscar'
            />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
