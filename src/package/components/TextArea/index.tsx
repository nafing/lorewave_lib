import type { CSSProperties, TextareaHTMLAttributes } from 'react'
import styles from './index.module.css'
import sharedStyles from '../_shared/field.module.css'
import { className } from '../../utils'
import type { StyleProps } from '../../utils'
import { FieldRoot, fieldSizeClassNames, fieldVariantClassNames, getFieldLayout, type FieldSize, type FieldVariant, type FieldWrapperProps } from '../_shared/field'

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  StyleProps &
  FieldWrapperProps & {
    size?: FieldSize
    style?: CSSProperties
    variant?: FieldVariant
  }

export const TextArea = ({
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
}: TextAreaProps) => {
  const { controlStyles, wrapperProps, wrapperStyles } = getFieldLayout({ ...props, description, error, hint, label, required, size, style, variant, withAsterisk })

  return (
    <FieldRoot description={description} error={error} hint={hint} label={label} required={required} style={{ ...wrapperStyles, ...style }} withAsterisk={withAsterisk}>
      <textarea
        {...wrapperProps}
        className={className(
          sharedStyles.control,
          sharedStyles.textarea,
          sharedStyles[fieldSizeClassNames[size]],
          sharedStyles[fieldVariantClassNames[variant]],
          styles.root,
          customClassName,
        )}
        style={controlStyles}
      />
    </FieldRoot>
  )
}