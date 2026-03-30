import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import { className, extractStyleProps, omitStyleProps } from '../../utils'
import type { StyleProps } from '../../utils'

export type BoxProps = HTMLAttributes<HTMLDivElement> &
  StyleProps & {
    children?: ReactNode
    style?: CSSProperties
  }

export const Box = ({ children, className: customClassName, style, ...props }: BoxProps) => {
  const layoutStyles = extractStyleProps(props)
  const htmlProps = omitStyleProps(props)

  return (
    <div
      {...htmlProps}
      className={className(styles.root, customClassName)}
      style={{ ...layoutStyles, ...style }}
    >
      {children}
    </div>
  )
}