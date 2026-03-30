import type { CSSProperties, InputHTMLAttributes } from 'react'
import styles from './index.module.css'
import sharedStyles from '../_shared/field.module.css'
import { className } from '../../utils'
import type { StyleProps } from '../../utils'
import { FieldRoot, fieldSizeClassNames, fieldVariantClassNames, getFieldLayout, type FieldSize, type FieldVariant, type FieldWrapperProps } from '../_shared/field'

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> &
  StyleProps &
  FieldWrapperProps & {
    size?: FieldSize
    style?: CSSProperties
    variant?: FieldVariant
  }

export const Slider = ({
  className: customClassName,
  description,
  error,
  hint,
  label,
  required,
  size = 'md',
  style,
  variant = 'default',
  withAsterisk,
  ...props
}: SliderProps) => {
  const { wrapperProps, wrapperStyles } = getFieldLayout({ ...props, description, error, hint, label, required, size, style, variant, withAsterisk })

  return (
    <FieldRoot description={description} error={error} hint={hint} label={label} required={required} style={{ ...wrapperStyles, ...style }} withAsterisk={withAsterisk}>
      <input
        {...wrapperProps}
        className={className(
          sharedStyles.range,
          sharedStyles[fieldSizeClassNames[size]],
          sharedStyles[fieldVariantClassNames[variant]],
          styles.root,
          customClassName,
        )}
        type="range"
      />
    </FieldRoot>
  )
}