import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

type As = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong'

interface HeadingPropsWithAs extends HTMLAttributes<HTMLElement> {
  as?: As
}

const heading = tv({
  base: 'text-base text-white font-bold',
  variants: {
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl/6',
      '3xl': 'text-3xl/8',
    },
  },
  defaultVariants: {
    variant: 'title',
    size: '3xl',
  },
})

type HeadingVariants = VariantProps<typeof heading>

type HeadingProps = HeadingPropsWithAs & HeadingVariants

export function Heading({
  as: Element = 'p',
  size,
  className,
  ...rest
}: HeadingProps) {
  return <Element className={twMerge(heading({ size }), className)} {...rest} />
}
