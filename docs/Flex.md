# Flex

`Flex` renderuje kontener `div` z `display: flex` i obsluguje najczesciej uzywane ustawienia osi, wyrownania i zawijania.

## Import

```tsx
import { Flex } from 'lorewave_lib'
```

## Kluczowe propsy

- `direction`: kierunek osi glownej, domyslnie `row`
- `align`: mapowane na `align-items`
- `justify`: mapowane na `justify-content`
- `wrap`: mapowane na `flex-wrap`
- `style`: dodatkowe style inline
- `StyleProps`: `m`, `p`, `gap`, `bg`, `color`, `radius`

Komponent dziedziczy tez natywne propsy `HTMLDivElement`.

## Przyklad

```tsx
<Flex align="center" gap="md" justify="space-between" wrap="wrap">
  <div>Lewa kolumna</div>
  <div>Prawa kolumna</div>
</Flex>
```