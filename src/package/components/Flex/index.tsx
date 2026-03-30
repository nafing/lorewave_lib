import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import { className, extractStyleProps, omitStyleProps } from '../../utils'
import type { StyleProps } from '../../utils'

export type FlexProps = HTMLAttributes<HTMLDivElement> &
  StyleProps & {
    align?: CSSProperties['alignItems']
    children?: ReactNode
    direction?: CSSProperties['flexDirection']
    justify?: CSSProperties['justifyContent']
    style?: CSSProperties
    wrap?: CSSProperties['flexWrap']
  }

export const Flex = ({
  align,
  children,
  className: customClassName,
  direction = 'row',
  justify,
  style,
  wrap,
  ...props
}: FlexProps) => {
  const layoutStyles = extractStyleProps(props)
  const htmlProps = omitStyleProps(props)

  return (
    <div
      {...htmlProps}
      className={className(styles.root, customClassName)}
      style={{
        ...layoutStyles,
        alignItems: align,
        flexDirection: direction,
        justifyContent: justify,
        flexWrap: wrap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}