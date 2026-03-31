# Badge

`Badge` renderuje etykiete lub status w formie niewielkiego znacznika.

## Import

```tsx
import { Badge } from 'lorewave_lib'
```

## Kluczowe propsy

- `variant`: `default | filled | light | outline | dot | transparent`, domyslnie `default`
- `size`: `xs | sm | md | lg | xl`, domyslnie `md`
- `children`: tresc badge'a
- `style`: dodatkowe style inline
- `StyleProps`: `m`, `p`, `bg`, `color`, `radius`

Komponent dziedziczy tez natywne propsy `HTMLDivElement`.

## Przyklad

```tsx
<Badge size="sm" variant="dot">
  Online
</Badge>
```