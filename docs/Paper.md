# Paper

`Paper` to powierzchnia do grupowania tresci. Obsluguje cien i opcjonalne obramowanie.

## Import

```tsx
import { Paper } from 'lorewave_lib'
```

## Kluczowe propsy

- `shadow`: `xs | sm | md | lg`, domyslnie `sm`
- `withBorder`: dodaje obramowanie powierzchni
- `children`: zawartosc sekcji
- `style`: dodatkowe style inline
- `StyleProps`: `m`, `p`, `bg`, `color`, `radius`

Komponent dziedziczy tez natywne propsy `HTMLDivElement`.

## Przyklad

```tsx
<Paper p="lg" radius="lg" shadow="md" withBorder>
  Tresc karty
</Paper>
```