# Button

`Button` renderuje natywny `button` z systemem wariantow, rozmiarow i opcjonalnymi sekcjami po lewej lub prawej stronie etykiety.

## Import

```tsx
import { Button } from 'lorewave_lib'
```

## Kluczowe propsy

- `variant`: `default | filled | light | outline | subtle | transparent`, domyslnie `default`
- `size`: `xs | sm | md | lg | xl`, domyslnie `md`
- `radius`: token promienia lub dowolna wartosc CSS
- `leftSection`, `rightSection`: elementy renderowane przy etykiecie
- `loading`: blokuje komponent i pokazuje loader

Komponent dziedziczy tez natywne propsy `ButtonHTMLAttributes<HTMLButtonElement>`.

## Przyklad

```tsx
<Button leftSection={<IconPlus size={16} />} variant="filled">
  Dodaj rekord
</Button>
```