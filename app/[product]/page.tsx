import React from 'react'
// import { useRouter } from 'next/router';

const Page = ({ params }: { params: { product: string } }) => {
  console.log('hola')
  return <h1>My Page: {params.product}</h1>
}

export default Page
