import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export type PortalProps = {
  children?: ReactNode
  disabled?: boolean
  target?: HTMLElement | null | string
}

export const Portal = ({ children, disabled = false, target }: PortalProps) => {
  if (disabled || typeof document === 'undefined') {
    return <>{children}</>
  }

  const resolvedTarget = (() => {
    if (!target) {
      return document.body
    }

    if (typeof target === 'string') {
      return document.querySelector(target)
    }

    return target
  })()

  if (!resolvedTarget) {
    return null
  }

  return createPortal(children, resolvedTarget)
}