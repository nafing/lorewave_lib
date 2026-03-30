import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import { className, extractStyleProps, omitStyleProps } from '../../utils'
import type { StyleProps } from '../../utils'

export type BadgeVariant = 'default' | 'filled' | 'light' | 'outline' | 'dot' | 'transparent'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type BadgeProps = HTMLAttributes<HTMLDivElement> &
  StyleProps & {
  children?: ReactNode
  size?: BadgeSize
  style?: CSSProperties
  variant?: BadgeVariant
}

export const Badge = ({
  children,
  className: customClassName,
  size = 'md',
  style,
  variant = 'default',
  ...props
}: BadgeProps) => {
  const layoutStyles = extractStyleProps(props)
  const badgeProps = omitStyleProps(props)

  return (
    <div
      {...badgeProps}
      className={className(styles.root, styles[size], styles[variant], customClassName)}
      style={{ ...layoutStyles, ...style }}
    >
      {variant === 'dot' && <span aria-hidden="true" className={styles.dotIndicator} />}
      {children}
    </div>
  )
}