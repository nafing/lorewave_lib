import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useRef, type CSSProperties, type InputHTMLAttributes } from 'react'
import styles from './index.module.css'
import sharedStyles from '../_shared/field.module.css'
import { className } from '../../utils'
import type { StyleProps } from '../../utils'
import { FieldRoot, fieldSizeClassNames, fieldVariantClassNames, getFieldLayout, type FieldSize, type FieldWrapperProps } from '../_shared/field'

export type NumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> &
  StyleProps &
  FieldWrapperProps & {
    size?: FieldSize
    style?: CSSProperties
    withControls?: boolean
  }

export const NumberInput = ({
  className: customClassName,
  description,
  error,
  hint,
  label,
  required,
  size = 'md',
  style,
  withControls = true,
  withAsterisk,
  ...props
}: NumberInputProps) => {
  const { controlStyles, wrapperProps, wrapperStyles } = getFieldLayout({ ...props, description, error, hint, label, required, size, style, withAsterisk })
  const inputRef = useRef<HTMLInputElement>(null)

  const stepValue = (direction: 'up' | 'down') => {
    const input = inputRef.current

    if (!input || input.disabled || input.readOnly) {
      return
    }

    if (direction === 'up') {
      input.stepUp()
    } else {
      input.stepDown()
    }

    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.focus()
  }

  return (
    <FieldRoot description={description} error={error} hint={hint} label={label} required={required} style={{ ...wrapperStyles, ...style }} withAsterisk={withAsterisk}>
      <div
        className={className(
          sharedStyles.control,
          sharedStyles[fieldSizeClassNames[size]],
          sharedStyles[fieldVariantClassNames.default],
          styles.shell,
          styles.root,
          customClassName,
        )}
        style={controlStyles}
      >
        {withControls && (
          <button
            aria-label="Decrease value"
            className={className(styles.control, styles.controlLeft)}
            disabled={wrapperProps.disabled}
            onClick={() => stepValue('down')}
            type="button"
          >
            <IconMinus size={16} stroke={2} />
          </button>
        )}
        <input
          {...wrapperProps}
          className={styles.input}
          ref={inputRef}
          type="number"
        />
        {withControls && (
          <button
            aria-label="Increase value"
            className={className(styles.control, styles.controlRight)}
            disabled={wrapperProps.disabled}
            onClick={() => stepValue('up')}
            type="button"
          >
            <IconPlus size={16} stroke={2} />
          </button>
        )}
      </div>
    </FieldRoot>
  )
}