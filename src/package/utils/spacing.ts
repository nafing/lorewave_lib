import type { CSSProperties } from 'react'

export const spacingTokens = {
  xs: 0.25,
  sm: 0.5,
  md: 1,
  lg: 1.5,
  xl: 2,
} as const

export const radiusTokens = {
  xs: 0.25,
  sm: 0.5,
  md: 0.75,
  lg: 1,
  xl: 1.5,
} as const

export const globalColorTokens = {
  white: 'var(--lw-color-white)',
  black: 'var(--lw-color-black)',
  text: 'var(--lw-color-text)',
  muted: 'var(--lw-color-text-muted)',
  dimmed: 'var(--lw-color-text-dimmed)',
  surface: 'var(--lw-color-surface)',
  'surface-alt': 'var(--lw-color-surface-alt)',
  'surface-soft': 'var(--lw-color-surface-soft)',
  border: 'var(--lw-color-border)',
  'border-strong': 'var(--lw-color-border-strong)',
  primary: 'var(--lw-color-primary)',
  'primary-soft': 'var(--lw-color-primary-soft)',
  'primary-strong': 'var(--lw-color-primary-strong)',
  'primary-text': 'var(--lw-color-primary-text)',
  divider: 'var(--lw-color-divider)',
} as const

export type SpacingToken = keyof typeof spacingTokens
export type SpacingValue = SpacingToken | number | string | undefined
export type RadiusToken = keyof typeof radiusTokens
export type RadiusValue = RadiusToken | number | string | undefined
export type GlobalColorToken = keyof typeof globalColorTokens

export type SpacingProps = {
  m?: SpacingValue
  mx?: SpacingValue
  my?: SpacingValue
  mt?: SpacingValue
  mr?: SpacingValue
  mb?: SpacingValue
  ml?: SpacingValue
  p?: SpacingValue
  px?: SpacingValue
  py?: SpacingValue
  pt?: SpacingValue
  pr?: SpacingValue
  pb?: SpacingValue
  pl?: SpacingValue
  gap?: SpacingValue
}

export type RadiusProps = {
  radius?: RadiusValue
}

export type ColorValue = CSSProperties['background'] | GlobalColorToken
export type TextColorValue = CSSProperties['color'] | GlobalColorToken

export type ColorProps = {
  bg?: ColorValue
  color?: TextColorValue
}

export type StyleProps = SpacingProps & RadiusProps & ColorProps

type SpacingStyleMap = Partial<
  Pick<
    CSSProperties,
    | 'margin'
    | 'marginTop'
    | 'marginRight'
    | 'marginBottom'
    | 'marginLeft'
    | 'padding'
    | 'paddingTop'
    | 'paddingRight'
    | 'paddingBottom'
    | 'paddingLeft'
    | 'gap'
  >
>

type RadiusStyleMap = Partial<Pick<CSSProperties, 'borderRadius'>>
type ColorStyleMap = Partial<Pick<CSSProperties, 'background' | 'color'>>
type StyleMap = SpacingStyleMap & RadiusStyleMap & ColorStyleMap

const ROOT_FONT_SIZE = 16

const spacingPropertyMap: Array<[keyof SpacingProps, keyof SpacingStyleMap | [keyof SpacingStyleMap, keyof SpacingStyleMap]]> = [
  ['m', 'margin'],
  ['mx', ['marginLeft', 'marginRight']],
  ['my', ['marginTop', 'marginBottom']],
  ['mt', 'marginTop'],
  ['mr', 'marginRight'],
  ['mb', 'marginBottom'],
  ['ml', 'marginLeft'],
  ['p', 'padding'],
  ['px', ['paddingLeft', 'paddingRight']],
  ['py', ['paddingTop', 'paddingBottom']],
  ['pt', 'paddingTop'],
  ['pr', 'paddingRight'],
  ['pb', 'paddingBottom'],
  ['pl', 'paddingLeft'],
  ['gap', 'gap'],
]

export const toRem = (value: number): string => `${value / ROOT_FONT_SIZE}rem`

const resolveTokenValue = <TToken extends string>(
  value: TToken | number | string | undefined,
  tokens: Record<TToken, number>,
) => {
  if (value === undefined) {
    return undefined
  }

  if (typeof value === 'number') {
    return toRem(value)
  }

  if (value in tokens) {
    return `${tokens[value as TToken]}rem`
  }

  return value
}

export const resolveSpacingValue = (value: SpacingValue): string | undefined => {
  return resolveTokenValue(value, spacingTokens)
}

export const resolveRadiusValue = (value: RadiusValue): string | undefined => {
  return resolveTokenValue(value, radiusTokens)
}

export const resolveColorValue = (
  value: ColorValue | TextColorValue,
): string | undefined => {
  if (!value) {
    return undefined
  }

  if (typeof value !== 'string') {
    return undefined
  }

  if (value in globalColorTokens) {
    return globalColorTokens[value as GlobalColorToken]
  }

  return value
}

export const extractSpacingStyles = (props: SpacingProps): SpacingStyleMap => {
  const styles: SpacingStyleMap = {}

  for (const [propName, cssProperty] of spacingPropertyMap) {
    const resolvedValue = resolveSpacingValue(props[propName])

    if (!resolvedValue) {
      continue
    }

    if (Array.isArray(cssProperty)) {
      styles[cssProperty[0]] = resolvedValue
      styles[cssProperty[1]] = resolvedValue
      continue
    }

    styles[cssProperty] = resolvedValue
  }

  return styles
}

export const extractRadiusStyles = (props: RadiusProps): RadiusStyleMap => {
  const radius = resolveRadiusValue(props.radius)

  if (!radius) {
    return {}
  }

  return {
    borderRadius: radius,
  }
}

export const extractColorStyles = (props: ColorProps): ColorStyleMap => {
  return {
    background: resolveColorValue(props.bg),
    color: resolveColorValue(props.color),
  }
}

export const extractStyleProps = (props: StyleProps): StyleMap => {
  return {
    ...extractSpacingStyles(props),
    ...extractRadiusStyles(props),
    ...extractColorStyles(props),
  }
}

export const omitSpacingProps = <T extends SpacingProps>(props: T) => {
  const {
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    gap,
    ...rest
  } = props

  void m
  void mx
  void my
  void mt
  void mr
  void mb
  void ml
  void p
  void px
  void py
  void pt
  void pr
  void pb
  void pl
  void gap

  return rest
}

export const omitStyleProps = <T extends StyleProps>(props: T) => {
  const { bg, color, radius, ...rest } = omitSpacingProps(props)

  void bg
  void color
  void radius

  return rest
}