import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import styles from '../_shared/overlay.module.css'
import { Portal } from '../Portal/index'
import { getOverlayAnimationName, useDismissableLayer, useOverlayPosition, type OverlayPosition } from '../_shared/overlay'

export type PopoverProps = {
  children?: ReactNode
  defaultOpened?: boolean
  disabled?: boolean
  offset?: number
  onChange?: (opened: boolean) => void
  opened?: boolean
  position?: OverlayPosition
  width?: CSSProperties['width']
  withinPortal?: boolean
}

type PopoverContextValue = {
  animationClassName: string
  disabled: boolean
  open: boolean
  overlayRef: React.RefObject<HTMLDivElement | null>
  overlayStyle: CSSProperties
  setOpen: (opened: boolean) => void
  targetRef: React.RefObject<HTMLSpanElement | null>
  width?: CSSProperties['width']
  withinPortal: boolean
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

const usePopoverContext = () => {
  const context = useContext(PopoverContext)

  if (!context) {
    throw new Error('Popover compound components must be used within Popover.')
  }

  return context
}

export type PopoverTargetProps = {
  children: ReactNode
}

const PopoverTarget = ({ children }: PopoverTargetProps) => {
  const { disabled, open, setOpen, targetRef } = usePopoverContext()

  return (
    <span className={styles.anchor} ref={targetRef}>
      <span onClick={() => !disabled && setOpen(!open)}>{children}</span>
    </span>
  )
}

export type PopoverDropdownProps = {
  children?: ReactNode
  width?: CSSProperties['width']
}

const PopoverDropdown = ({ children, width }: PopoverDropdownProps) => {
  const { animationClassName, disabled, open, overlayRef, overlayStyle, width: rootWidth, withinPortal } = usePopoverContext()

  if (!open || disabled) {
    return null
  }

  return (
    <Portal disabled={!withinPortal}>
      <div className={styles.layer} ref={overlayRef} style={overlayStyle}>
        <div className={`${styles.surface} ${styles.popover} ${animationClassName}`} style={width ? { width } : rootWidth ? { width: rootWidth } : undefined}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

const PopoverRoot = ({
  children,
  defaultOpened = false,
  disabled = false,
  offset = 8,
  onChange,
  opened,
  position = 'bottom-start',
  width,
  withinPortal = true,
}: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpened)
  const open = opened === undefined ? uncontrolledOpen : opened
  const overlayRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLSpanElement>(null)
  const overlayStyle = useOverlayPosition({ offset, open, overlayRef, position, targetRef })
  const animationClassName = styles[getOverlayAnimationName(position)]

  const setOpen = (nextOpen: boolean) => {
    if (opened === undefined) {
      setUncontrolledOpen(nextOpen)
    }

    onChange?.(nextOpen)
  }

  useEffect(() => {
    if (disabled && open) {
      setOpen(false)
    }
  }, [disabled, open])

  useDismissableLayer([targetRef, overlayRef], () => setOpen(false), open)

  return (
    <PopoverContext.Provider value={{ animationClassName, disabled, open, overlayRef, overlayStyle, setOpen, targetRef, width, withinPortal }}>
      {children}
    </PopoverContext.Provider>
  )
}

export const Popover = Object.assign(PopoverRoot, {
  Dropdown: PopoverDropdown,
  Target: PopoverTarget,
})