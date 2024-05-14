import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { env } from '@/env'
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

type OgImageProps = {
  params: {
    slug: string
  }
}

export default async function OgImage({ params }: OgImageProps) {
  const product = await getProduct(params.slug)

  const productImageURL = new URL(
    `/images${product.image}`,
    env.NEXT_URL,
  ).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[500],
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={productImageURL} alt="" style={{ height: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}
