import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { MenuEntry, MenuItem } from '../_shared/menu'
import {
  MenuSystemCheckboxItem,
  MenuSystemDivider,
  MenuSystemDropdown,
  MenuSystemItem,
  MenuSystemLabel,
  MenuSystemProvider,
  MenuSystemRadioGroup,
  MenuSystemRadioItem,
  MenuSystemSubmenu,
  MenuSystemTarget,
} from '../_shared/menuSystem'
import { getOverlayAnimationName, useDismissableLayer, useOverlayPosition, type OverlayPosition } from '../_shared/overlay'
import styles from '../_shared/overlay.module.css'

export type { MenuEntry, MenuItem }

export type MenuProps = {
  defaultOpened?: boolean
  disabled?: boolean
  items?: MenuEntry[]
  offset?: number
  onChange?: (opened: boolean) => void
  opened?: boolean
  position?: OverlayPosition
  width?: CSSProperties['width']
  withinPortal?: boolean
  children?: ReactNode
}

export type MenuTargetProps = {
  children: ReactNode
}

const MenuTarget = MenuSystemTarget

export type MenuDropdownProps = {
  children?: ReactNode
  items?: MenuEntry[]
  width?: CSSProperties['width']
}

const MenuDropdownContent = MenuSystemDropdown

export type MenuItemProps = {
  children: ReactNode
  closeOnClick?: boolean
  danger?: boolean
  description?: ReactNode
  disabled?: boolean
  leftSection?: ReactNode
  onClick?: () => void
  rightSection?: ReactNode
}

const CompoundMenuItem = MenuSystemItem

export type MenuDividerProps = {
  label?: ReactNode
}

const CompoundMenuDivider = MenuSystemDivider

export type MenuLabelProps = {
  children: ReactNode
}

const CompoundMenuLabel = MenuSystemLabel

export type MenuCheckboxItemProps = {
  checked?: boolean
  children: ReactNode
  closeOnClick?: boolean
  description?: ReactNode
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const MenuCheckboxItem = ({
  checked = false,
  children,
  closeOnClick = false,
  description,
  disabled,
  onCheckedChange,
}: MenuCheckboxItemProps) => {
  return (
    <MenuSystemCheckboxItem
      checked={checked}
      closeOnClick={closeOnClick}
      description={description}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
    >
      {children}
    </MenuSystemCheckboxItem>
  )
}

export type MenuRadioGroupProps = {
  children: ReactNode
  onValueChange?: (value: string) => void
  value?: string
}

const MenuRadioGroup = MenuSystemRadioGroup

export type MenuRadioItemProps = {
  children: ReactNode
  closeOnClick?: boolean
  description?: ReactNode
  disabled?: boolean
  value: string
}

const MenuRadioItem = ({ children, closeOnClick = false, description, disabled, value }: MenuRadioItemProps) => {
  return (
    <MenuSystemRadioItem closeOnClick={closeOnClick} description={description} disabled={disabled} value={value}>
      {children}
    </MenuSystemRadioItem>
  )
}

export type MenuSubmenuProps = {
  children: ReactNode
  description?: ReactNode
  disabled?: boolean
  label: ReactNode
  leftSection?: ReactNode
}

const MenuSubmenu = MenuSystemSubmenu

const MenuRoot = ({
  defaultOpened = false,
  disabled = false,
  items,
  offset = 8,
  onChange,
  opened,
  position = 'bottom-end',
  width,
  withinPortal = true,
  children,
}: MenuProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpened)
  const open = opened === undefined ? uncontrolledOpen : opened
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLElement | null>(null)
  const treeIdRef = useRef(`lw-menu-${Math.random().toString(36).slice(2)}`)
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

  useDismissableLayer([targetRef, overlayRef], () => setOpen(false), open, {
    ignoreSelector: `[data-menu-tree="${treeIdRef.current}"]`,
  })

  return (
    <MenuSystemProvider
      animationClassName={animationClassName}
      closeMenu={() => setOpen(false)}
      defaultItems={items}
      disabled={disabled}
      open={open}
      overlayRef={overlayRef}
      overlayStyle={overlayStyle}
      setOpen={setOpen}
      targetRef={targetRef}
      treeId={treeIdRef.current}
      triggerMode="click"
      width={width}
      withinPortal={withinPortal}
    >
      {children}
    </MenuSystemProvider>
  )
}

export const Menu = Object.assign(MenuRoot, {
  CheckboxItem: MenuCheckboxItem,
  Divider: CompoundMenuDivider,
  Dropdown: MenuDropdownContent,
  Item: CompoundMenuItem,
  Label: CompoundMenuLabel,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Submenu: MenuSubmenu,
  Target: MenuTarget,
})