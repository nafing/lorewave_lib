import { IconCheck, IconChevronRight } from '@tabler/icons-react'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { className } from '../../utils'
import { Portal } from '../Portal/index'
import { isMenuDivider, type MenuEntry, type MenuItem } from './menu'
import { getOverlayAnimationName, useDismissableLayer, useOverlayPosition } from './overlay'
import styles from './overlay.module.css'

type TriggerMode = 'click' | 'contextmenu'

type MenuSystemContextValue = {
  animationClassName: string
  closeMenu: () => void
  defaultItems?: MenuEntry[]
  disabled: boolean
  open: boolean
  openAt?: (point: { x: number; y: number }) => void
  overlayRef: RefObject<HTMLDivElement | null>
  overlayStyle: CSSProperties
  setOpen: (opened: boolean) => void
  targetRef: RefObject<HTMLElement | null>
  treeId: string
  triggerMode: TriggerMode
  width?: CSSProperties['width']
  withinPortal: boolean
}

type MenuRadioGroupContextValue = {
  onValueChange?: (value: string) => void
  value?: string
}

const MenuSystemContext = createContext<MenuSystemContextValue | null>(null)
const MenuRadioGroupContext = createContext<MenuRadioGroupContextValue | null>(null)

const useMenuSystemContext = () => {
  const context = useContext(MenuSystemContext)

  if (!context) {
    throw new Error('Menu system compound components must be used within a menu root.')
  }

  return context
}

const useMenuRadioGroupContext = () => useContext(MenuRadioGroupContext)

const getFocusableMenuItems = (container: HTMLElement | null) => {
  if (!container) {
    return [] as HTMLElement[]
  }

  return Array.from(container.querySelectorAll<HTMLElement>('[data-menu-item="true"]:not([disabled])'))
}

const focusMenuItem = (items: HTMLElement[], index: number) => {
  if (items.length === 0) {
    return
  }

  const safeIndex = ((index % items.length) + items.length) % items.length
  items[safeIndex]?.focus()
}

const handleMenuListKeyDown = (
  event: KeyboardEvent<HTMLElement>,
  overlayRef: RefObject<HTMLDivElement | null>,
  closeMenu: () => void,
) => {
  const items = getFocusableMenuItems(overlayRef.current)

  if (items.length === 0) {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeMenu()
    }

    return
  }

  const currentIndex = items.findIndex((item) => item === document.activeElement)

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusMenuItem(items, currentIndex === -1 ? 0 : currentIndex + 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusMenuItem(items, currentIndex === -1 ? items.length - 1 : currentIndex - 1)
      break
    case 'Home':
      event.preventDefault()
      focusMenuItem(items, 0)
      break
    case 'End':
      event.preventDefault()
      focusMenuItem(items, items.length - 1)
      break
    case 'Escape':
      event.preventDefault()
      closeMenu()
      break
    default:
      break
  }
}

export type MenuSystemProviderProps = {
  animationClassName: string
  children?: ReactNode
  closeMenu: () => void
  defaultItems?: MenuEntry[]
  disabled: boolean
  open: boolean
  openAt?: (point: { x: number; y: number }) => void
  overlayRef: RefObject<HTMLDivElement | null>
  overlayStyle: CSSProperties
  setOpen: (opened: boolean) => void
  targetRef: RefObject<HTMLElement | null>
  treeId: string
  triggerMode: TriggerMode
  width?: CSSProperties['width']
  withinPortal: boolean
}

export const MenuSystemProvider = ({ children, ...value }: MenuSystemProviderProps) => {
  return <MenuSystemContext.Provider value={value}>{children}</MenuSystemContext.Provider>
}

export type MenuSystemTargetProps = {
  children: ReactNode
}

export const MenuSystemTarget = ({ children }: MenuSystemTargetProps) => {
  const { disabled, open, openAt, setOpen, targetRef, triggerMode } = useMenuSystemContext()

  const handleClick = () => {
    if (triggerMode !== 'click' || disabled) {
      return
    }

    setOpen(!open)
  }

  const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
    if (triggerMode !== 'contextmenu' || disabled) {
      return
    }

    event.preventDefault()
    openAt?.({ x: event.clientX, y: event.clientY })
  }

  const targetProps = triggerMode === 'contextmenu'
    ? { className: styles.contextTarget, onContextMenu: handleContextMenu }
    : { className: styles.anchor, onClick: handleClick }

  return (
    <span {...targetProps} ref={targetRef as RefObject<HTMLSpanElement | null>}>
      {children}
    </span>
  )
}

const renderMenuEntries = (items: MenuEntry[], onItemClick: (item: MenuItem) => void) => {
  return items.map((item, index) => {
    if (isMenuDivider(item)) {
      return item.label ? (
        <div className={styles.menuSection} key={item.key ?? `section-${index}`}>
          {item.label}
        </div>
      ) : (
        <div className={styles.menuDivider} key={item.key ?? `divider-${index}`} />
      )
    }

    return (
      <button
        className={className(
          styles.menuItem,
          item.danger && styles.menuItemDanger,
          item.disabled && styles.menuItemDisabled,
        )}
        data-menu-item="true"
        disabled={item.disabled}
        key={item.key ?? `item-${index}`}
        onClick={() => onItemClick(item)}
        role="menuitem"
        type="button"
      >
        <span className={styles.menuItemMain}>
          {item.leftSection}
          <span className={styles.menuItemText}>
            <span className={styles.menuItemLabel}>{item.label}</span>
            {item.description && <span className={styles.menuItemDescription}>{item.description}</span>}
          </span>
        </span>
        {item.rightSection}
      </button>
    )
  })
}

export type MenuSystemDropdownProps = {
  children?: ReactNode
  items?: MenuEntry[]
  width?: CSSProperties['width']
}

export const MenuSystemDropdown = ({ children, items, width }: MenuSystemDropdownProps) => {
  const {
    animationClassName,
    closeMenu,
    defaultItems,
    disabled,
    open,
    overlayRef,
    overlayStyle,
    treeId,
    width: rootWidth,
    withinPortal,
  } = useMenuSystemContext()
  const resolvedItems = items ?? defaultItems ?? []

  useEffect(() => {
    if (!open || disabled) {
      return undefined
    }

    const frame = window.requestAnimationFrame(() => {
      focusMenuItem(getFocusableMenuItems(overlayRef.current), 0)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [disabled, open, overlayRef])

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) {
      return
    }

    item.onClick?.()

    if (item.closeOnClick !== false) {
      closeMenu()
    }
  }

  if (!open || disabled) {
    return null
  }

  return (
    <Portal disabled={!withinPortal}>
      <div className={styles.layer} ref={overlayRef} style={overlayStyle}>
        <div
          className={className(styles.surface, styles.menu, animationClassName)}
          data-menu-tree={treeId}
          style={width ? { width } : rootWidth ? { width: rootWidth } : undefined}
        >
          <div
            className={styles.menuList}
            onKeyDown={(event) => handleMenuListKeyDown(event, overlayRef, closeMenu)}
            role="menu"
          >
            {children ?? renderMenuEntries(resolvedItems, handleItemClick)}
          </div>
        </div>
      </div>
    </Portal>
  )
}

type MenuSystemActionItemProps = {
  ariaChecked?: boolean
  children: ReactNode
  closeOnClick?: boolean
  danger?: boolean
  description?: ReactNode
  disabled?: boolean
  leftSection?: ReactNode
  onClick?: () => void
  rightSection?: ReactNode
  role?: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio'
}

const MenuSystemActionItem = ({
  ariaChecked,
  children,
  closeOnClick = true,
  danger,
  description,
  disabled,
  leftSection,
  onClick,
  rightSection,
  role = 'menuitem',
}: MenuSystemActionItemProps) => {
  const { closeMenu } = useMenuSystemContext()

  const handleClick = () => {
    if (disabled) {
      return
    }

    onClick?.()

    if (closeOnClick) {
      closeMenu()
    }
  }

  return (
    <button
      aria-checked={ariaChecked}
      className={className(styles.menuItem, danger && styles.menuItemDanger, disabled && styles.menuItemDisabled)}
      data-menu-item="true"
      disabled={disabled}
      onClick={handleClick}
      role={role}
      type="button"
    >
      <span className={styles.menuItemMain}>
        {leftSection && <span className={styles.menuIndicator}>{leftSection}</span>}
        <span className={styles.menuItemText}>
          <span className={styles.menuItemLabel}>{children}</span>
          {description && <span className={styles.menuItemDescription}>{description}</span>}
        </span>
      </span>
      {rightSection}
    </button>
  )
}

export type MenuSystemItemProps = {
  children: ReactNode
  closeOnClick?: boolean
  danger?: boolean
  description?: ReactNode
  disabled?: boolean
  leftSection?: ReactNode
  onClick?: () => void
  rightSection?: ReactNode
}

export const MenuSystemItem = (props: MenuSystemItemProps) => <MenuSystemActionItem {...props} />

export type MenuSystemDividerProps = {
  label?: ReactNode
}

export const MenuSystemDivider = ({ label }: MenuSystemDividerProps) => {
  return label ? <div className={styles.menuSection}>{label}</div> : <div className={styles.menuDivider} />
}

export type MenuSystemLabelProps = {
  children: ReactNode
}

export const MenuSystemLabel = ({ children }: MenuSystemLabelProps) => <div className={styles.menuSection}>{children}</div>

export type MenuSystemCheckboxItemProps = {
  checked?: boolean
  children: ReactNode
  closeOnClick?: boolean
  description?: ReactNode
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const MenuSystemCheckboxItem = ({
  checked = false,
  children,
  closeOnClick = false,
  description,
  disabled,
  onCheckedChange,
}: MenuSystemCheckboxItemProps) => {
  return (
    <MenuSystemActionItem
      ariaChecked={checked}
      closeOnClick={closeOnClick}
      description={description}
      disabled={disabled}
      leftSection={<span className={className(styles.menuIndicator, styles.menuCheck)}>{checked ? <IconCheck size={14} stroke={2.4} /> : null}</span>}
      onClick={() => onCheckedChange?.(!checked)}
      role="menuitemcheckbox"
    >
      {children}
    </MenuSystemActionItem>
  )
}

export type MenuSystemRadioGroupProps = {
  children: ReactNode
  onValueChange?: (value: string) => void
  value?: string
}

export const MenuSystemRadioGroup = ({ children, onValueChange, value }: MenuSystemRadioGroupProps) => {
  return <MenuRadioGroupContext.Provider value={{ onValueChange, value }}>{children}</MenuRadioGroupContext.Provider>
}

export type MenuSystemRadioItemProps = {
  children: ReactNode
  closeOnClick?: boolean
  description?: ReactNode
  disabled?: boolean
  value: string
}

export const MenuSystemRadioItem = ({
  children,
  closeOnClick = false,
  description,
  disabled,
  value,
}: MenuSystemRadioItemProps) => {
  const radioGroup = useMenuRadioGroupContext()
  const checked = radioGroup?.value === value

  return (
    <MenuSystemActionItem
      ariaChecked={checked}
      closeOnClick={closeOnClick}
      description={description}
      disabled={disabled}
      leftSection={<span className={className(styles.menuIndicator, styles.menuRadio)}>{checked ? <span className={styles.menuRadioDot} /> : null}</span>}
      onClick={() => radioGroup?.onValueChange?.(value)}
      role="menuitemradio"
    >
      {children}
    </MenuSystemActionItem>
  )
}

export type MenuSystemSubmenuProps = {
  children: ReactNode
  description?: ReactNode
  disabled?: boolean
  label: ReactNode
  leftSection?: ReactNode
}

export const MenuSystemSubmenu = ({ children, description, disabled, label, leftSection }: MenuSystemSubmenuProps) => {
  const parentContext = useMenuSystemContext()
  const [open, setOpen] = useState(false)
  const targetRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const overlayStyle = useOverlayPosition({ offset: 6, open, overlayRef, position: 'right', targetRef })
  const closeTimeoutRef = useRef<number | null>(null)

  useDismissableLayer([targetRef, overlayRef], () => setOpen(false), open, {
    ignoreSelector: `[data-menu-tree="${parentContext.treeId}"]`,
  })

  useEffect(() => {
    if (disabled && open) {
      setOpen(false)
    }
  }, [disabled, open])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const clearCloseTimer = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimeoutRef.current = window.setTimeout(() => setOpen(false), 100)
  }

  const openSubmenu = () => {
    clearCloseTimer()
    setOpen(true)
  }

  const openAndFocusFirst = () => {
    openSubmenu()
    window.requestAnimationFrame(() => {
      focusMenuItem(getFocusableMenuItems(overlayRef.current), 0)
    })
  }

  return (
    <>
      <button
        className={className(styles.menuItem, disabled && styles.menuItemDisabled)}
        data-menu-item="true"
        disabled={disabled}
        onClick={() => !disabled && setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            openAndFocusFirst()
          }
        }}
        onMouseEnter={() => !disabled && openSubmenu()}
        onMouseLeave={scheduleClose}
        ref={targetRef}
        role="menuitem"
        type="button"
      >
        <span className={styles.menuItemMain}>
          {leftSection && <span className={styles.menuIndicator}>{leftSection}</span>}
          <span className={styles.menuItemText}>
            <span className={styles.menuItemLabel}>{label}</span>
            {description && <span className={styles.menuItemDescription}>{description}</span>}
          </span>
        </span>
        <IconChevronRight className={styles.menuSubmenuCaret} size={14} stroke={2.2} />
      </button>
      {open && !disabled && (
        <Portal disabled={!parentContext.withinPortal}>
          <div className={styles.layer} ref={overlayRef} style={overlayStyle}>
            <div className={className(styles.surface, styles.menu, styles[getOverlayAnimationName('right')])} data-menu-tree={parentContext.treeId}>
              <div
                className={styles.menuList}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowLeft') {
                    event.preventDefault()
                    setOpen(false)
                    targetRef.current?.focus()
                    return
                  }

                  handleMenuListKeyDown(event, overlayRef, () => {
                    setOpen(false)
                    targetRef.current?.focus()
                  })
                }}
                onMouseEnter={clearCloseTimer}
                onMouseLeave={scheduleClose}
                role="menu"
              >
                <MenuSystemProvider
                  animationClassName={styles[getOverlayAnimationName('right')]}
                  closeMenu={parentContext.closeMenu}
                  disabled={parentContext.disabled}
                  open={open}
                  overlayRef={overlayRef}
                  overlayStyle={overlayStyle}
                  setOpen={setOpen}
                  targetRef={targetRef as RefObject<HTMLElement | null>}
                  treeId={parentContext.treeId}
                  triggerMode="click"
                  withinPortal={parentContext.withinPortal}
                >
                  {children}
                </MenuSystemProvider>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}