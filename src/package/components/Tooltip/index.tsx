import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from '../_shared/overlay.module.css'
import { Portal } from '../Portal/index'
import { getOverlayAnimationName, useOverlayPosition, type OverlayPosition } from '../_shared/overlay'

export type TooltipProps = {
  children: ReactNode
  closeDelay?: number
  disabled?: boolean
  label: ReactNode
  offset?: number
  openDelay?: number
  position?: OverlayPosition
  withinPortal?: boolean
}

export const Tooltip = ({
  children,
  closeDelay = 40,
  disabled = false,
  label,
  offset = 8,
  openDelay = 80,
  position = 'top',
  withinPortal = true,
}: TooltipProps) => {
  const [open, setOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLSpanElement>(null)
  const openTimeoutRef = useRef<number | null>(null)
  const closeTimeoutRef = useRef<number | null>(null)
  const overlayStyle = useOverlayPosition({ offset, open, overlayRef, position, targetRef })
  const animationClassName = styles[getOverlayAnimationName(position)]

  const clearTimers = () => {
    if (openTimeoutRef.current !== null) {
      window.clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }

    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  useEffect(() => clearTimers, [])

  const scheduleOpen = () => {
    if (disabled) {
      return
    }

    clearTimers()
    openTimeoutRef.current = window.setTimeout(() => setOpen(true), openDelay)
  }

  const scheduleClose = () => {
    clearTimers()
    closeTimeoutRef.current = window.setTimeout(() => setOpen(false), closeDelay)
  }

  return (
    <span
      className={styles.anchor}
      onBlur={scheduleClose}
      onFocus={scheduleOpen}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      ref={targetRef}
    >
      {children}
      {open && !disabled && (
        <Portal disabled={!withinPortal}>
          <div className={styles.layer} ref={overlayRef} style={overlayStyle}>
            <div className={`${styles.surface} ${styles.tooltip} ${animationClassName}`}>{label}</div>
          </div>
        </Portal>
      )}
    </span>
  )
}