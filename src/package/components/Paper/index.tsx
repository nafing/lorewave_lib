import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import { className, extractStyleProps, omitStyleProps } from '../../utils'
import type { StyleProps } from '../../utils'

export type PaperShadow = 'xs' | 'sm' | 'md' | 'lg'

export type PaperProps = HTMLAttributes<HTMLDivElement> &
  StyleProps & {
    children?: ReactNode
    shadow?: PaperShadow
    style?: CSSProperties
    withBorder?: boolean
  }

const shadowClassNames: Record<PaperShadow, string> = {
  xs: styles.shadowXs,
  sm: styles.shadowSm,
  md: styles.shadowMd,
  lg: styles.shadowLg,
}

export const Paper = ({
  children,
  className: customClassName,
  shadow = 'sm',
  style,
  withBorder = false,
  ...props
}: PaperProps) => {
  const layoutStyles = extractStyleProps(props)
  const htmlProps = omitStyleProps(props)

  return (
    <div
      {...htmlProps}
      className={className(styles.root, shadowClassNames[shadow], withBorder && styles.withBorder, customClassName)}
      style={{ ...layoutStyles, ...style }}
    >
      {children}
    </div>
  )
}