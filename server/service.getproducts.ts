import { IproductResponse, IListSearchResult } from './types'
import imagNotFound from '../public/images/not-image.png'
const authorName = 'Luis Evelio'
const authorLastname = 'Garcia Rodriguez'

export const getDefaultProducts = async (queryParams: string) => {
  const productsListSearchResult = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${queryParams.replaceAll('-', ' ')}`)
    .then(res => res.json())

  if (productsListSearchResult) {
    const formatItem = productsListSearchResult?.results?.slice(0, 4).map((item: any) => {
      return {
        id: item?.id,
        title: item?.title,
        price: {
          currency: item?.currency_id,
          amount: item?.price,
          decimals: (item?.price % 1).toFixed(2).split('.')[1]
        },
        picture: item?.thumbnail || imagNotFound,
        condition: item?.condition,
        free_shipping: item?.shipping?.free_shipping
      }
    })

    const formatCategories = productsListSearchResult?.filters?.flatMap((category: any) =>
      category.values.map((value: any) => value.name)
    )

    const dataTransformed: IListSearchResult = {
      author: {
        name: authorName,
        lastname: authorLastname
      },
      categories: formatCategories,
      items: formatItem
    }

    return dataTransformed
  }

  return null
}

export const getDescripcionById = (param: string | undefined) => {
  return fetch(`https://api.mercadolibre.com/items/${param}/description`)
    .then(res => res.json())
}

export const getProductById = async (param: string | undefined) => {
  const productInformation: any = await fetch(`https://api.mercadolibre.com/items/${param}`)
    .then(res => res.json())
  const descripcionResponse = await getDescripcionById(param)

  if (productInformation) {
    const dataTransmormed: IproductResponse = {
      author: {
        name: authorName,
        lastname: authorLastname
      },
      item: {
        id: productInformation?.id,
        title: productInformation?.title,
        price: {
          currency: productInformation?.currency_id,
          amount: productInformation?.price,
          decimals: parseInt((productInformation?.price % 1).toFixed(2).split('.')[1])
        },
        thumbnail: productInformation?.thumbnail || imagNotFound,
        picture: productInformation?.pictures[0]?.url || imagNotFound,
        condition: productInformation?.condition,
        free_shipping: productInformation?.shipping?.free_shipping,
        sold_quantity: productInformation?.sold_quantity,
        description: descripcionResponse?.plain_text,
        permalink: productInformation?.permalink
      }
    }

    return dataTransmormed
  }
  return null
}
