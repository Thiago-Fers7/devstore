'use client'

import { ComponentProps, ReactNode } from 'react'
import { useRadioGroup } from './radio-group'

type RadioButtonProps = ComponentProps<'input'> & {
  children: ReactNode
}

export function RadioButton({
  children,
  className,
  ...props
}: RadioButtonProps) {
  const { name, value, handleChangeValue } = useRadioGroup()

  return (
    <label
      data-checked={value === props.value}
      data-disabled={props.disabled}
      className={className}
    >
      <input
        type="radio"
        name={name}
        onChange={(event) => handleChangeValue?.(event.target.value || '')}
        className="sr-only"
        {...props}
      />

      {children}
    </label>
  )
}
