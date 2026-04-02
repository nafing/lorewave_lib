import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import sharedStyles from '../_shared/field.module.css'
import { className } from '../../utils'
import type { StyleProps } from '../../utils'
import { FieldRoot, fieldSizeClassNames, fieldVariantClassNames, getFieldLayout, useFieldControlId, type FieldSize, type FieldWrapperProps } from '../_shared/field'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'size'> &
  StyleProps &
  FieldWrapperProps & {
    label?: ReactNode
    size?: FieldSize
    style?: CSSProperties
  }

export const Checkbox = ({
  className: customClassName,
  description,
  disabled,
  error,
  hint,
  label,
  required,
  size = 'md',
  style,
  withAsterisk,
  ...props
}: CheckboxProps) => {
  const controlId = useFieldControlId(props.id)
  const { wrapperProps, wrapperStyles } = getFieldLayout({ ...props, description, error, hint, required, size, style, withAsterisk })

  return (
    <FieldRoot description={description} error={error} hint={hint} label={undefined} required={required} style={{ ...wrapperStyles, ...style }} withAsterisk={withAsterisk}>
      <label
        className={className(
          sharedStyles.choiceRoot,
          sharedStyles[fieldSizeClassNames[size]],
          sharedStyles[fieldVariantClassNames.default],
          disabled && sharedStyles.choiceDisabled,
          styles.root,
          customClassName,
        )}
      >
        <input {...wrapperProps} className={sharedStyles.choiceInput} disabled={disabled} id={controlId} type="checkbox" />
        <span className={sharedStyles.checkboxIndicator} />
        {label && (
          <span className={sharedStyles.choiceLabel}>
            {label}
            {(required || withAsterisk) && <span className={sharedStyles.fieldAsterisk}>*</span>}
          </span>
        )}
      </label>
    </FieldRoot>
  )
}