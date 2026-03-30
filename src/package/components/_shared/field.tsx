import type { CSSProperties, ReactNode } from 'react'
import styles from './field.module.css'
import { className, extractColorStyles, extractRadiusStyles, extractSpacingStyles, omitStyleProps } from '../../utils'
import type { StyleProps } from '../../utils'

export type FieldVariant = 'default' | 'filled' | 'light' | 'outline' | 'subtle' | 'transparent'
export type FieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type FieldWrapperProps = {
  description?: ReactNode
  error?: ReactNode
  hint?: ReactNode
  label?: ReactNode
  required?: boolean
  withAsterisk?: boolean
}

export type FieldStyleProps = StyleProps &
  FieldWrapperProps & {
    size?: FieldSize
    style?: CSSProperties
    variant?: FieldVariant
  }

export const fieldVariantClassNames: Record<FieldVariant, string> = {
  default: 'variantDefault',
  filled: 'variantFilled',
  light: 'variantLight',
  outline: 'variantOutline',
  subtle: 'variantSubtle',
  transparent: 'variantTransparent',
}

export const fieldSizeClassNames: Record<FieldSize, string> = {
  xs: 'sizeXs',
  sm: 'sizeSm',
  md: 'sizeMd',
  lg: 'sizeLg',
  xl: 'sizeXl',
}

export const getFieldLayout = <T extends FieldStyleProps>(props: T) => {
  const { description, error, hint, label, size, style, variant, withAsterisk, ...rest } = props

  void description
  void error
  void hint
  void label
  void size
  void style
  void variant
  void withAsterisk

  return {
    wrapperProps: omitStyleProps(rest),
    wrapperStyles: extractSpacingStyles(rest),
    controlStyles: {
      ...extractRadiusStyles(rest),
      ...extractColorStyles(rest),
    },
  }
}

type FieldRootProps = FieldWrapperProps & {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export const FieldRoot = ({
  children,
  className: customClassName,
  description,
  error,
  hint,
  label,
  required,
  style,
  withAsterisk,
}: FieldRootProps) => {
  const showAsterisk = required || withAsterisk

  return (
    <div className={className(styles.fieldRoot, customClassName)} style={style}>
      {(label || hint) && (
        <div className={styles.fieldHeader}>
          {label && (
            <div className={styles.fieldLabel}>
              {label}
              {showAsterisk && <span className={styles.fieldAsterisk}>*</span>}
            </div>
          )}
          {hint && <div className={styles.fieldHint}>{hint}</div>}
        </div>
      )}
      <div className={styles.fieldBody}>{children}</div>
      {description && <div className={styles.fieldDescription}>{description}</div>}
      {error && <div className={styles.fieldError}>{error}</div>}
    </div>
  )
}