export interface IDataUser {
    name: string
    lastname: string
}

interface IPrice {
    currency: string
    amount: number | undefined
    decimals: number
}

interface IItem{
    id: string
    title: string
    price: IPrice
    picture: string | undefined
    condition: string
    free_shipping: boolean
    sold_quantity: number
    description: string
    thumbnail: string
    permalink: string
}

export interface IproductResponse {
    author: IDataUser
    item: IItem
}

interface IPriceSearchResult {
    currency: string
    amount: number | undefined
    decimals:number
}

interface IItemSearhResult {
    map(arg0: (product: any) => import('react').JSX.Element): import('react').ReactNode
    id: string
    title: string
    price: IPriceSearchResult
    picture: string
    condition: string
    free_shipping: string
}

export interface IListSearchResult {
    author: IDataUser
    categories: []
    items: IItemSearhResult
}
