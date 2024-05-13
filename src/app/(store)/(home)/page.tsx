import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { formatCurrency } from '@/utils/formatCurrency'
import Image from 'next/image'
import Link from 'next/link'

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[860px] h-full grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="relative group col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden grid place-items-center"
      >
        <Image
          src={`/images${highlightedProduct.image}`}
          className="group-hover:scale-105 transition-transform duration-300"
          width={860}
          height={860}
          alt={highlightedProduct.title}
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-72 border-zinc-500 rounded-full border-2 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold text-nowrap">
            {formatCurrency(highlightedProduct.price)}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="relative group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden grid place-items-center"
        >
          <Image
            src={`/images${product.image}`}
            className="group-hover:scale-105 transition-transform duration-300"
            width={430}
            height={430}
            alt="produto 1"
          />

          <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-72 border-zinc-500 rounded-full border-2 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{product.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold text-nowrap">
              {formatCurrency(product.price)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
