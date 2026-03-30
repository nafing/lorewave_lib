export type ActionVariant = 'default' | 'filled' | 'light' | 'outline' | 'subtle' | 'transparent'
export type ActionSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const actionVariantClassNames: Record<ActionVariant, string> = {
  default: 'variantDefault',
  filled: 'variantFilled',
  light: 'variantLight',
  outline: 'variantOutline',
  subtle: 'variantSubtle',
  transparent: 'variantTransparent',
}

export const actionSizeClassNames: Record<ActionSize, string> = {
  xs: 'sizeXs',
  sm: 'sizeSm',
  md: 'sizeMd',
  lg: 'sizeLg',
  xl: 'sizeXl',
}