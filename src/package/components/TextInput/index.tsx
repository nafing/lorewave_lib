import type { CSSProperties, InputHTMLAttributes } from 'react'
import styles from './index.module.css'
import sharedStyles from '../_shared/field.module.css'
import { className } from '../../utils'
import type { StyleProps } from '../../utils'
import { FieldRoot, fieldSizeClassNames, fieldVariantClassNames, getFieldLayout, useFieldControlId, type FieldSize, type FieldWrapperProps } from '../_shared/field'

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> &
  StyleProps &
  FieldWrapperProps & {
    size?: FieldSize
    style?: CSSProperties
  }

export const TextInput = ({
  className: customClassName,
  description,
  error,
  hint,
  label,
  required,
  size = 'md',
  style,
  withAsterisk,
  ...props
}: TextInputProps) => {
  const controlId = useFieldControlId(props.id)
  const { controlStyles, wrapperProps, wrapperStyles } = getFieldLayout({ ...props, description, error, hint, label, required, size, style, withAsterisk })

  return (
    <FieldRoot description={description} error={error} hint={hint} label={label} required={required} style={{ ...wrapperStyles, ...style }} withAsterisk={withAsterisk}>
      <input
        {...wrapperProps}
        className={className(
          sharedStyles.control,
          sharedStyles[fieldSizeClassNames[size]],
          sharedStyles[fieldVariantClassNames.default],
          styles.root,
          customClassName,
        )}
        id={controlId}
        style={controlStyles}
        type="text"
      />
    </FieldRoot>
  )
}