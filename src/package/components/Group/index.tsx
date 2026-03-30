import styles from './index.module.css'
import { Flex, type FlexProps } from '../Flex/index'
import { className } from '../../utils'

export type GroupProps = Omit<FlexProps, 'align' | 'direction' | 'wrap'>

export const Group = ({ className: customClassName, ...props }: GroupProps) => {
  return (
    <Flex
      {...props}
      align="center"
      className={className(styles.root, customClassName)}
      direction="row"
      wrap="wrap"
    />
  )
}