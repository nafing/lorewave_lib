import { useEffect, type ReactNode, type RefObject } from 'react'

export type SelectOption = {
  disabled?: boolean
  label: ReactNode
  search?: string
  value: string
}

export const getOptionSearchText = (option: SelectOption) => {
  if (option.search) {
    return option.search
  }

  if (typeof option.label === 'string') {
    return option.label
  }

  return option.value
}

export const findSelectOption = (data: SelectOption[], value: string | null | undefined) => {
  if (value == null) {
    return null
  }

  return data.find((option) => option.value === value) ?? null
}

export const findSelectOptions = (data: SelectOption[], values: string[]) => {
  const valueSet = new Set(values)

  return data.filter((option) => valueSet.has(option.value))
}

export const filterSelectOptions = (data: SelectOption[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return data
  }

  return data.filter((option) => getOptionSearchText(option).toLowerCase().includes(normalizedQuery))
}

export const useDismissableLayer = <TElement extends HTMLElement>(
  ref: RefObject<TElement | null>,
  onDismiss: () => void,
  enabled: boolean,
) => {
  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (ref.current?.contains(target)) {
        return
      }

      onDismiss()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, onDismiss, ref])
}