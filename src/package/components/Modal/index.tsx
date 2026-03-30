import { IconX } from '@tabler/icons-react'
import { useEffect, useId, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import styles from './index.module.css'
import { className } from '../../utils'
import { ActionIcon } from '../ActionIcon/index'
import { useDismissableLayer } from '../_shared/overlay'
import { Portal } from '../Portal/index'

export type ModalProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  children?: ReactNode
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  defaultOpened?: boolean
  description?: ReactNode
  lockScroll?: boolean
  onChange?: (opened: boolean) => void
  onClose?: () => void
  opened?: boolean
  size?: CSSProperties['width']
  target?: HTMLElement | null | string
  title?: ReactNode
  withinPortal?: boolean
  withCloseButton?: boolean
}

export const Modal = ({
  children,
  className: customClassName,
  closeOnClickOutside = true,
  closeOnEscape = true,
  defaultOpened = false,
  description,
  lockScroll = true,
  onChange,
  onClose,
  opened,
  size = '32rem',
  style,
  target,
  title,
  withinPortal = true,
  withCloseButton = true,
  ...props
}: ModalProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpened)
  const contentRef = useRef<HTMLDivElement>(null)
  const open = opened === undefined ? uncontrolledOpen : opened
  const isScopedToTarget = Boolean(target)
  const titleId = useId()
  const descriptionId = useId()

  const setOpen = (nextOpen: boolean) => {
    if (nextOpen === open) {
      return
    }

    if (opened === undefined) {
      setUncontrolledOpen(nextOpen)
    }

    onChange?.(nextOpen)

    if (!nextOpen) {
      onClose?.()
    }
  }

  useDismissableLayer([contentRef], () => setOpen(false), open, {
    dismissOnEscape: closeOnEscape,
    dismissOnPointerDownOutside: closeOnClickOutside,
  })

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const frame = window.requestAnimationFrame(() => {
      contentRef.current?.focus()
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [open])

  useEffect(() => {
    if (!open || !lockScroll || typeof document === 'undefined') {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
    }
  }, [lockScroll, open])

  if (!open) {
    return null
  }

  return (
    <Portal disabled={!withinPortal} target={target}>
      <div className={className(styles.root, isScopedToTarget && styles.rootScoped)}>
        <div aria-hidden="true" className={styles.backdrop} />
        <div className={styles.positioner}>
          <div
            {...props}
            aria-describedby={description ? descriptionId : undefined}
            aria-labelledby={title ? titleId : undefined}
            aria-modal="true"
            className={className(styles.content, isScopedToTarget && styles.contentScoped, customClassName)}
            ref={contentRef}
            role="dialog"
            style={{ ...style, '--lw-modal-size': size } as CSSProperties}
            tabIndex={-1}
          >
            {(title || description || withCloseButton) && (
              <div className={styles.header}>
                <div className={styles.headerCopy}>
                  {title && (
                    <h2 className={styles.title} id={titleId}>
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className={styles.description} id={descriptionId}>
                      {description}
                    </p>
                  )}
                </div>
                {withCloseButton && (
                  <ActionIcon
                    aria-label="Close modal"
                    className={styles.closeButton}
                    onClick={() => setOpen(false)}
                    size="sm"
                    variant="subtle"
                  >
                    <IconX size={18} stroke={2} />
                  </ActionIcon>
                )}
              </div>
            )}
            <div className={styles.body}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  )
}