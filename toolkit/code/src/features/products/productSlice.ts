import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { Product, ProductState } from "../../types/Product"

const initialState: ProductState = {
  products: [
    { id: "1", name: "Apple", price: 20 },
    { id: "2", name: "Banana", price: 3 },
    { id: "3", name: "Orange", price: 10 },
  ],
  cart: [],
  total: 0,
  loading: false,
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.find(
        item => item.id === action.payload.id,
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }

      state.total += action.payload.price
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload)

      if (itemIndex !== -1) {
        const item = state.cart[itemIndex]
        state.total -= item.price * item.quantity
        state.cart.splice(itemIndex, 1)
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.cart.find(item => item.id === action.payload.id)

      if (item) {
        const priceDiff = (action.payload.quantity - item.quantity) * item.price
        item.quantity = action.payload.quantity
        state.total += priceDiff
      }
    },

    clearCart: state => {
      state.cart = []
      state.total = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  productSlice.actions
export default productSlice.reducer
