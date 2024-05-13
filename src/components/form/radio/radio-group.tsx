'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
} from 'react'

type RadioGroupContext = {
  value: string
  name: string
  defaultValue?: string
  handleChangeValue?: (value: string) => void
}

const radioGroupContext = createContext({} as RadioGroupContext)

type RadioGroupProps = {
  children: ReactNode
  defaultValue?: string
  handleChange?: (value: string) => void
}

export function RadioGroup({
  children,
  defaultValue = '',
  handleChange,
}: RadioGroupProps) {
  const [value, setValue] = useState(defaultValue)
  const name = useId()

  const handleChangeValue = useCallback(
    (value: string) => {
      setValue(value)
      handleChange?.(value)
    },
    [handleChange],
  )

  return (
    <radioGroupContext.Provider value={{ name, value, handleChangeValue }}>
      {children}
    </radioGroupContext.Provider>
  )
}

export const useRadioGroup = () => {
  return useContext(radioGroupContext)
}
