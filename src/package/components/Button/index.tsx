import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import sharedStyles from '../_shared/action.module.css'
import { className, resolveRadiusValue } from '../../utils'
import { actionSizeClassNames, actionVariantClassNames } from '../_shared/action'
import type { RadiusValue } from '../../utils'

export type ButtonVariant = keyof typeof actionVariantClassNames
export type ButtonSize = keyof typeof actionSizeClassNames

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  leftSection?: ReactNode
  loading?: boolean
  radius?: RadiusValue
  rightSection?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

export const Button = ({
  children,
  className: customClassName,
  disabled,
  leftSection,
  loading = false,
  radius,
  rightSection,
  size = 'md',
  type = 'button',
  variant = 'default',
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading
  const resolvedRadius = resolveRadiusValue(radius)

  return (
    <button
      {...props}
      className={className(
        sharedStyles.base,
        sharedStyles[actionVariantClassNames[variant]],
        sharedStyles[actionSizeClassNames[size]],
        loading && sharedStyles.loading,
        styles.root,
        customClassName,
      )}
      disabled={isDisabled}
      style={{ ...props.style, ...(resolvedRadius ? { borderRadius: resolvedRadius } : {}) }}
      type={type}
    >
      {loading && <span aria-hidden="true" className={sharedStyles.loader} />}
      {!loading && leftSection && <span className={sharedStyles.section}>{leftSection}</span>}
      <span className={sharedStyles.label}>{children}</span>
      {!loading && rightSection && <span className={sharedStyles.section}>{rightSection}</span>}
    </button>
  )
}