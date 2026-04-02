import type { CSSProperties, TextareaHTMLAttributes } from 'react'
import styles from './index.module.css'
import sharedStyles from '../_shared/field.module.css'
import { className } from '../../utils'
import type { StyleProps } from '../../utils'
import { FieldRoot, fieldVariantClassNames, getFieldLayout, useFieldControlId, type FieldWrapperProps } from '../_shared/field'

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  StyleProps &
  FieldWrapperProps & {
    style?: CSSProperties
  }

export const TextArea = ({
  className: customClassName,
  description,
  error,
  hint,
  label,
  required,
  style,
  withAsterisk,
  ...props
}: TextAreaProps) => {
  const controlId = useFieldControlId(props.id)
  const { controlStyles, wrapperProps, wrapperStyles } = getFieldLayout({ ...props, description, error, hint, label, required, style, withAsterisk })

  return (
    <FieldRoot description={description} error={error} hint={hint} label={label} required={required} style={{ ...wrapperStyles, ...style }} withAsterisk={withAsterisk}>
      <textarea
        {...wrapperProps}
        className={className(
          sharedStyles.control,
          sharedStyles.textarea,
          sharedStyles[fieldVariantClassNames.default],
          styles.root,
          customClassName,
        )}
        id={controlId}
        style={controlStyles}
      />
    </FieldRoot>
  )
}