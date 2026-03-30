import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './index.module.css'
import sharedStyles from '../_shared/action.module.css'
import { className, resolveRadiusValue } from '../../utils'
import { actionSizeClassNames, actionVariantClassNames, type ActionSize, type ActionVariant } from '../_shared/action'
import type { RadiusValue } from '../../utils'

export type ActionIconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  loading?: boolean
  radius?: RadiusValue
  size?: ActionSize
  variant?: ActionVariant
}

export const ActionIcon = ({
  children,
  className: customClassName,
  disabled,
  loading = false,
  radius,
  size = 'md',
  type = 'button',
  variant = 'default',
  ...props
}: ActionIconProps) => {
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
        sharedStyles.icon,
        styles.root,
        customClassName,
      )}
      disabled={isDisabled}
      style={{ ...props.style, ...(resolvedRadius ? { borderRadius: resolvedRadius } : {}) }}
      type={type}
    >
      {loading ? <span aria-hidden="true" className={sharedStyles.loader} /> : children}
    </button>
  )
}