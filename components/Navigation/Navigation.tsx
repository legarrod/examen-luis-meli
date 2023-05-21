import React from 'react'
import style from '../../styles/navigation.module.scss'
import Image from 'next/image'
import logo from '../../public/images/Logo_ML.png'
import Link from 'next/link'
import InputSearch from './InputSearch'

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
        <InputSearch />
      </div>
    </nav>
  )
}

export default Navigation
