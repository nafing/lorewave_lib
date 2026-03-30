import { createElement, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import styles from './index.module.css'
import { className, extractStyleProps, omitStyleProps } from '../../utils'
import type { StyleProps } from '../../utils'

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TextAlign = CSSProperties['textAlign']
export type FontWeight = CSSProperties['fontWeight']

export type TextProps = HTMLAttributes<HTMLElement> &
  StyleProps & {
    as?: 'div' | 'label' | 'p' | 'span'
    children?: ReactNode
    fw?: FontWeight
    lineClamp?: number
    size?: TextSize
    style?: CSSProperties
    ta?: TextAlign
    truncate?: boolean
  }

export const Text = ({
  as = 'p',
  children,
  className: customClassName,
  fw,
  lineClamp,
  size = 'md',
  style,
  ta,
  truncate = false,
  ...props
}: TextProps) => {
  const layoutStyles = extractStyleProps(props)
  const htmlProps = omitStyleProps(props)
  const typographyStyles: CSSProperties = {
    fontWeight: fw,
    textAlign: ta,
  }

  if (lineClamp !== undefined) {
    typographyStyles.WebkitLineClamp = String(lineClamp)
  }

  return createElement(
    as,
    {
      ...htmlProps,
      className: className(styles.root, styles[size], truncate && styles.truncate, lineClamp !== undefined && styles.lineClamp, customClassName),
      style: { ...layoutStyles, ...typographyStyles, ...style },
    },
    children,
  )
}