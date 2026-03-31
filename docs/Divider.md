# Divider

`Divider` oddziela sekcje w pionie albo poziomie i opcjonalnie pokazuje etykiete pomiedzy liniami.

## Import

```tsx
import { Divider } from 'lorewave_lib'
```

## Kluczowe propsy

- `orientation`: `horizontal | vertical`, domyslnie `horizontal`
- `label`: opcjonalna etykieta w osi separatora
- `style`: dodatkowe style inline
- `className`: wlasna klasa CSS

Komponent dziedziczy tez natywne propsy `HTMLDivElement`.

## Przyklad

```tsx
<Divider label="Zaawansowane" />
```