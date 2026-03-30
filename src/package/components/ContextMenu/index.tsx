import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
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
import { getOverlayAnimationName, useDismissableLayer, useOverlayPosition } from '../_shared/overlay'
import styles from '../_shared/overlay.module.css'

export type ContextMenuProps = {
  disabled?: boolean
  width?: CSSProperties['width']
  withinPortal?: boolean
  children?: ReactNode
}

export type ContextMenuTargetProps = {
  children: ReactNode
}

const ContextMenuTarget = MenuSystemTarget

export type ContextMenuDropdownProps = {
  children?: ReactNode
  width?: CSSProperties['width']
}

const ContextMenuDropdown = MenuSystemDropdown

export type ContextMenuItemProps = {
  children: ReactNode
  closeOnClick?: boolean
  danger?: boolean
  description?: ReactNode
  disabled?: boolean
  leftSection?: ReactNode
  onClick?: () => void
  rightSection?: ReactNode
}

const ContextMenuItem = MenuSystemItem

export type ContextMenuDividerProps = {
  label?: ReactNode
}

const ContextMenuDivider = MenuSystemDivider

export type ContextMenuLabelProps = {
  children: ReactNode
}

const ContextMenuLabel = MenuSystemLabel

export type ContextMenuCheckboxItemProps = {
  checked?: boolean
  children: ReactNode
  closeOnClick?: boolean
  description?: ReactNode
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const ContextMenuCheckboxItem = ({
  checked = false,
  children,
  closeOnClick = false,
  description,
  disabled,
  onCheckedChange,
}: ContextMenuCheckboxItemProps) => {
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

export type ContextMenuRadioGroupProps = {
  children: ReactNode
  onValueChange?: (value: string) => void
  value?: string
}

const ContextMenuRadioGroup = MenuSystemRadioGroup

export type ContextMenuRadioItemProps = {
  children: ReactNode
  closeOnClick?: boolean
  description?: ReactNode
  disabled?: boolean
  value: string
}

const ContextMenuRadioItem = ({ children, closeOnClick = false, description, disabled, value }: ContextMenuRadioItemProps) => {
  return (
    <MenuSystemRadioItem closeOnClick={closeOnClick} description={description} disabled={disabled} value={value}>
      {children}
    </MenuSystemRadioItem>
  )
}

export type ContextMenuSubmenuProps = {
  children: ReactNode
  description?: ReactNode
  disabled?: boolean
  label: ReactNode
  leftSection?: ReactNode
}

const ContextMenuSubmenu = MenuSystemSubmenu

const ContextMenuRoot = ({ disabled = false, width, withinPortal = true, children }: ContextMenuProps) => {
  const [open, setOpen] = useState(false)
  const [anchorPoint, setAnchorPoint] = useState<{ x: number; y: number } | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLElement | null>(null)
  const treeIdRef = useRef(`lw-context-menu-${Math.random().toString(36).slice(2)}`)
  const overlayStyle = useOverlayPosition({ anchorPoint, open, overlayRef, position: 'bottom-start' })
  const animationClassName = styles[getOverlayAnimationName('bottom-start')]

  useDismissableLayer([targetRef, overlayRef], () => setOpen(false), open, {
    ignoreSelector: `[data-menu-tree="${treeIdRef.current}"]`,
  })

  return (
    <MenuSystemProvider
      animationClassName={animationClassName}
      closeMenu={() => setOpen(false)}
      disabled={disabled}
      open={open}
      openAt={(point) => {
        setAnchorPoint(point)
        setOpen(true)
      }}
      overlayRef={overlayRef}
      overlayStyle={overlayStyle}
      setOpen={setOpen}
      targetRef={targetRef}
      treeId={treeIdRef.current}
      triggerMode="contextmenu"
      width={width}
      withinPortal={withinPortal}
    >
      {children}
    </MenuSystemProvider>
  )
}

export const ContextMenu = Object.assign(ContextMenuRoot, {
  CheckboxItem: ContextMenuCheckboxItem,
  Divider: ContextMenuDivider,
  Dropdown: ContextMenuDropdown,
  Item: ContextMenuItem,
  Label: ContextMenuLabel,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Submenu: ContextMenuSubmenu,
  Target: ContextMenuTarget,
})