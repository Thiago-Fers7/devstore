import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { formatCurrency } from '@/utils/formatCurrency'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

type SearchPageProps = {
  searchParams: {
    q?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  if (!products?.length) {
    return <p>Nenhum produto encontrado</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="relative group rounded-lg bg-zinc-900 overflow-hidden grid place-items-center"
          >
            <Image
              src={product.image}
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
    </div>
  )
}
