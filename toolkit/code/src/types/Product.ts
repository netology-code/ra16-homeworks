export type Product = {
  id: string
  name: string
  price: number
}

export type CartItem = {
  quantity: number
} & Product

export type ProductState = {
  products: Product[]
  cart: CartItem[]
  total: number
  loading: boolean
}
