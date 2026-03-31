# Text

`Text` sluzy do renderowania tekstu o kontrolowanej semantyce i skali typograficznej. Moze renderowac `p`, `span`, `label` albo `div`.

## Import

```tsx
import { Text } from 'lorewave_lib'
```

## Kluczowe propsy

- `as`: `div | label | p | span`, domyslnie `p`
- `size`: `xs | sm | md | lg | xl`, domyslnie `md`
- `fw`: wartosc `font-weight`
- `ta`: wartosc `text-align`
- `truncate`: wlacza pojedyncze obciecie tekstu
- `lineClamp`: ogranicza liczbe linii z obcieciem
- `StyleProps`: `m`, `p`, `bg`, `color`, `radius`

## Przyklad

```tsx
<Text color="muted" lineClamp={2} size="sm">
  Duzszy opis, ktory powinien zostac ograniczony do dwoch linii.
</Text>
```