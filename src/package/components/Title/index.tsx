import { createElement, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import styles from './index.module.css'
import { className, extractStyleProps, omitStyleProps } from '../../utils'
import type { StyleProps } from '../../utils'

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6

export type TitleProps = HTMLAttributes<HTMLHeadingElement> &
  StyleProps & {
    children?: ReactNode
    order?: TitleOrder
    style?: CSSProperties
  }

export const Title = ({
  children,
  className: customClassName,
  order = 1,
  style,
  ...props
}: TitleProps) => {
  const layoutStyles = extractStyleProps(props)
  const htmlProps = omitStyleProps(props)
  const element = `h${order}` as const
  const orderClassName = `order${order}` as const

  return createElement(
    element,
    {
      ...htmlProps,
      className: className(styles.root, styles[orderClassName], customClassName),
      style: { ...layoutStyles, ...style },
    },
    children,
  )
}