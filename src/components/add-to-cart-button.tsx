'use client'

import { useCart } from '@/contexts/cart-context'
import { Text } from './text'

type AddToCartButtonProps = {
  productId: number
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  return (
    <button
      type="button"
      className="rounded-full bg-emerald-500 px-5 py-2.5 w-full"
      onClick={() => addToCart(productId)}
    >
      <Text as="span" variant="semiboldBody" className="text-white">
        Adicionar ao carrinho
      </Text>
    </button>
  )
}
