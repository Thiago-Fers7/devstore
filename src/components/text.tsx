import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

type As = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong'

interface TextPropsWithAs extends HTMLAttributes<HTMLElement> {
  as?: As
}

const text = tv({
  base: 'text-base text-zinc-400',
  variants: {
    variant: {
      regularBody: '',
      regularLegend: 'text-zinc-400 text-sm',
      semiboldBody: 'text-white font-semibold',
      semiboldLegend: 'text-white font-semibold text-sm',
    },
  },
  defaultVariants: {
    variant: 'regularBody',
  },
})

type TextVariants = VariantProps<typeof text>

type TextProps = TextPropsWithAs & TextVariants

export function Text({
  as: Element = 'p',
  variant,
  className,
  ...rest
}: TextProps) {
  return <Element className={twMerge(text({ variant }), className)} {...rest} />
}
