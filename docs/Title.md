# Title

`Title` renderuje naglowki `h1`-`h6` na podstawie propsa `order`.

## Import

```tsx
import { Title } from 'lorewave_lib'
```

## Kluczowe propsy

- `order`: `1 | 2 | 3 | 4 | 5 | 6`, domyslnie `1`
- `style`: dodatkowe style inline
- `className`: wlasna klasa CSS
- `StyleProps`: `m`, `p`, `bg`, `color`, `radius`

Komponent dziedziczy tez natywne propsy `HTMLHeadingElement`.

## Przyklad

```tsx
<Title order={2} mb="sm">
  Ustawienia profilu
</Title>
```