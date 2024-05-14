'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

type CartItem = {
  productId: number
  quantity: number
}

type CartContext = {
  items: CartItem[]
  addToCart: (productId: number) => void
}

const cartContext = createContext({} as CartContext)

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = useCallback((productId: number) => {
    setCartItems((prevItems) => {
      const productAlreadyInCart = prevItems.some(
        (item) => item.productId === productId,
      )

      if (productAlreadyInCart) {
        return prevItems.map((item) => {
          if (item.productId === productId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          } else {
            return item
          }
        })
      }

      return [...prevItems, { productId, quantity: 1 }]
    })
  }, [])

  return (
    <cartContext.Provider
      value={{
        addToCart,
        items: cartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

export const useCart = () => useContext(cartContext)
