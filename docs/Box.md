# Box

`Box` to najprostszy kontener blokowy oparty o `div`. Sluzy jako neutralna warstwa do budowania ukladu i przyjmuje wspolne `StyleProps`.

## Import

```tsx
import { Box } from 'lorewave_lib'
```

## Kluczowe propsy

- `children`: zawartosc renderowana wewnatrz kontenera
- `style`: dodatkowe style inline
- `className`: wlasne klasy CSS
- `StyleProps`: `m`, `p`, `gap`, `bg`, `color`, `radius`

Komponent dziedziczy tez natywne propsy `HTMLDivElement`.

## Przyklad

```tsx
<Box p="lg" radius="md" bg="surface-alt">
  Sekcja tresci
</Box>
```