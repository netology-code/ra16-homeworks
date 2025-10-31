import type React from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../features/products/productSlice"
import type { Product } from "../types/Product"

const ProductList: React.FC = () => {
  const { products, cart, total } = useAppSelector(state => state.products)
  const dispatch = useAppDispatch()

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId))
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id: productId, quantity }))
    }
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div>
      <h2>Product Management</h2>

      <h3>Available Products</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.map(product => (
          <div
            key={product.id}
            style={{ border: "1px solid #ccc", padding: "1rem" }}
          >
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
            <button
              onClick={() => {
                handleAddToCart(product)
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h3>Shopping Cart ({cart.length} items)</h3>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem",
                border: "1px solid #eee",
                marginBottom: "0.5rem",
              }}
            >
              <span>{item.name}</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <button
                  onClick={() => {
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>Qty: {item.quantity}</span>
                <button
                  onClick={() => {
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }}
                >
                  +
                </button>
                <span>${item.price * item.quantity}</span>
                <button
                  onClick={() => {
                    handleRemoveFromCart(item.id)
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div
            style={{
              textAlign: "right",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Total: ${total}
          </div>
          <button
            onClick={handleClearCart}
            style={{
              marginTop: "1rem",
              backgroundColor: "#dc3545",
              color: "white",
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductList
