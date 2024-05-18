import { AddToCartButton } from '@/components/add-to-cart-button'
import { RadioButton } from '@/components/form/radio/radio-button'
import { RadioGroup } from '@/components/form/radio/radio-group'
import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { formatCurrency } from '@/utils/formatCurrency'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

type ProductPageProps = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  return {
    title: product.title,
    description: product.description,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products: Product[] = await response.json()

  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  const sizes = [
    {
      available: true,
      value: 'P',
    },
    {
      available: true,
      value: 'M',
    },
    {
      available: false,
      value: 'G',
    },
    {
      available: true,
      value: 'GG',
    },
  ]

  return (
    <div className="flex gap-4 max-h-[860px]">
      <div className="flex-1 grid place-items-center">
        <Image
          src={product.image}
          alt="product 1"
          width={860}
          height={860}
          quality={100}
        />
      </div>

      <form className="py-16 px-6 space-y-8 max-w-[400px]">
        <div>
          <Heading as="h1">{product.title}</Heading>
          <Text>{product.description}</Text>
        </div>

        <div className="flex gap-3 items-center">
          <span className="flex h-full items-center w-min justify-center rounded-full bg-violet-500 px-5 py-2.5">
            <Text as="strong" variant="semiboldBody" className="text-nowrap">
              {formatCurrency(product.price)}
            </Text>
          </span>

          <Text as="span" variant="regularLegend">
            Em 12x s/ juros de {formatCurrency(product.price / 12)}
          </Text>
        </div>

        <div>
          <Text as="strong" variant="semiboldBody" className="block mb-4">
            Tamanhos
          </Text>

          <div className="flex gap-2">
            <RadioGroup>
              {sizes.map((size) => (
                <RadioButton
                  key={size.value}
                  value={size.value}
                  disabled={!size.available}
                  className={twMerge(
                    'w-[54px] h-[37px] grid place-items-center bg-zinc-800 rounded-full border border-zinc-700 cursor-pointer',
                    'data-[checked=true]:bg-zinc-600 data-[checked=true]:border-zinc-500',
                    'data-[disabled=true]:opacity-35 data-[disabled="true"]:cursor-not-allowed',
                  )}
                >
                  <Text variant="semiboldLegend">{size.value}</Text>
                </RadioButton>
              ))}
            </RadioGroup>
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </form>
    </div>
  )
}
