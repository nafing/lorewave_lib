import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import { className } from '../../utils'

export type DividerOrientation = 'horizontal' | 'vertical'

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode
  orientation?: DividerOrientation
  style?: CSSProperties
}

export const Divider = ({
  className: customClassName,
  label,
  orientation = 'horizontal',
  style,
  ...props
}: DividerProps) => {
  return (
    <div {...props} className={className(styles.root, styles[orientation], customClassName)} style={style}>
      <span aria-hidden="true" className={styles.line} />
      {label && <span className={styles.label}>{label}</span>}
      {label && <span aria-hidden="true" className={styles.line} />}
    </div>
  )
}