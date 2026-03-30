import type { ReactNode } from 'react'

export type MenuItem = {
  closeOnClick?: boolean
  danger?: boolean
  description?: ReactNode
  disabled?: boolean
  key?: string
  label: ReactNode
  leftSection?: ReactNode
  onClick?: () => void
  rightSection?: ReactNode
  type?: 'item'
}

export type MenuDivider = {
  key?: string
  label?: ReactNode
  type: 'divider'
}

export type MenuEntry = MenuItem | MenuDivider

export const isMenuDivider = (entry: MenuEntry): entry is MenuDivider => entry.type === 'divider'