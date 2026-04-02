import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import sharedStyles from '../_shared/field.module.css'
import { className } from '../../utils'
import type { StyleProps } from '../../utils'
import { fieldSizeClassNames, fieldVariantClassNames, getFieldLayout, useFieldControlId, type FieldSize, type FieldWrapperProps } from '../_shared/field'

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type' | 'size'> &
  StyleProps &
  FieldWrapperProps & {
    label?: ReactNode
    size?: FieldSize
    style?: CSSProperties
  }

export const Switch = ({
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
}: SwitchProps) => {
  const controlId = useFieldControlId(props.id)
  const { wrapperProps, wrapperStyles } = getFieldLayout({ ...props, description, error, hint, required, size, style, withAsterisk })

  return (
    <div className={styles.field} style={{ ...wrapperStyles, ...style }}>
      {hint && <div className={sharedStyles.fieldHint}>{hint}</div>}
      <label
        className={className(
          sharedStyles[fieldSizeClassNames[size]],
          sharedStyles[fieldVariantClassNames.default],
          disabled && sharedStyles.choiceDisabled,
          styles.root,
          customClassName,
        )}
      >
        <input {...wrapperProps} className={className(sharedStyles.choiceInput, styles.input)} disabled={disabled} id={controlId} type="checkbox" />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
        <span className={styles.content}>
          {label && (
            <span className={className(sharedStyles.choiceLabel, styles.labelText)}>
              {label}
              {(required || withAsterisk) && <span className={sharedStyles.fieldAsterisk}>*</span>}
            </span>
          )}
          {description && <span className={className(sharedStyles.fieldDescription, styles.description)}>{description}</span>}
          {error && <span className={className(sharedStyles.fieldError, styles.error)}>{error}</span>}
        </span>
      </label>
    </div>
  )
}