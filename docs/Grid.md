# Grid

`Grid` renderuje kontener `div` z `display: grid`. Pozwala ustawic stale kolumny albo responsywny uklad oparty o `minChildWidth`.

## Import

```tsx
import { Grid } from 'lorewave_lib'
```

## Kluczowe propsy

- `cols`: liczba kolumn albo wartosc `grid-template-columns`
- `minChildWidth`: minimalna szerokosc kafla, wlacza `repeat(auto-fit, minmax(...))`
- `align`: mapowane na `align-items`
- `justify`: mapowane na `justify-items`
- `style`: dodatkowe style inline
- `StyleProps`: `m`, `p`, `gap`, `bg`, `color`, `radius`

Komponent dziedziczy tez natywne propsy `HTMLDivElement`.

## Przyklad

```tsx
<Grid gap="lg" minChildWidth={240}>
  <div>Karta 1</div>
  <div>Karta 2</div>
  <div>Karta 3</div>
</Grid>
```