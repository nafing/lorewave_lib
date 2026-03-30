import type { CSSProperties } from 'react'
import styles from './index.module.css'
import { Flex, type FlexProps } from '../Flex/index'
import { className } from '../../utils'

export type StackProps = Omit<FlexProps, 'direction'> & {
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
}

export const Stack = ({ className: customClassName, ...props }: StackProps) => {
  return <Flex {...props} className={className(styles.root, customClassName)} direction="column" />
}