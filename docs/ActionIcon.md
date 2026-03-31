# ActionIcon

`ActionIcon` to kompaktowy przycisk ikonowy oparty o ten sam system wariantow, rozmiarow i loadera co `Button`.

## Import

```tsx
import { ActionIcon } from 'lorewave_lib'
```

## Kluczowe propsy

- `variant`: `default | filled | light | outline | subtle | transparent`, domyslnie `default`
- `size`: `xs | sm | md | lg | xl`, domyslnie `md`
- `radius`: token promienia lub wartosc CSS
- `loading`: blokuje przycisk i podmienia zawartosc na loader
- `children`: najczesciej pojedyncza ikona

Komponent dziedziczy tez natywne propsy `ButtonHTMLAttributes<HTMLButtonElement>`.

## Przyklad

```tsx
<ActionIcon aria-label="Ustawienia" variant="outline">
  <IconSettings size={18} />
</ActionIcon>
```