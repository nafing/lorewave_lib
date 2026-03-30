import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import { className, extractStyleProps, omitStyleProps } from '../../utils'
import type { StyleProps } from '../../utils'

export type GridProps = HTMLAttributes<HTMLDivElement> &
  StyleProps & {
    align?: CSSProperties['alignItems']
    children?: ReactNode
    cols?: number | string
    justify?: CSSProperties['justifyItems']
    minChildWidth?: number | string
    style?: CSSProperties
  }

const resolveGridColumns = ({ cols, minChildWidth }: Pick<GridProps, 'cols' | 'minChildWidth'>) => {
  if (minChildWidth !== undefined) {
    const minWidth = typeof minChildWidth === 'number' ? `${minChildWidth / 16}rem` : minChildWidth
    return `repeat(auto-fit, minmax(${minWidth}, 1fr))`
  }

  if (typeof cols === 'number') {
    return `repeat(${cols}, minmax(0, 1fr))`
  }

  return cols
}

export const Grid = ({
  align,
  children,
  className: customClassName,
  cols,
  justify,
  minChildWidth,
  style,
  ...props
}: GridProps) => {
  const layoutStyles = extractStyleProps(props)
  const htmlProps = omitStyleProps(props)

  return (
    <div
      {...htmlProps}
      className={className(styles.root, customClassName)}
      style={{
        ...layoutStyles,
        alignItems: align,
        gridTemplateColumns: resolveGridColumns({ cols, minChildWidth }),
        justifyItems: justify,
        ...style,
      }}
    >
      {children}
    </div>
  )
}