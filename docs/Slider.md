# Slider

`Slider` renderuje natywny `input[type="range"]` z wrapperem formularzowym.

## Import

```tsx
import { Slider } from 'lorewave_lib'
```

## Kluczowe propsy

- `label`, `description`, `error`, `hint`: tresci pomocnicze pola
- `required`, `withAsterisk`: oznaczenie pola wymaganego
- `size`: `xs | sm | md | lg | xl`, domyslnie `md`
- spacing props: stylowanie wrappera

Komponent dziedziczy natywne propsy `input[type="range"]`.

## Przyklad

```tsx
<Slider label="Glosnosc" defaultValue={40} max={100} min={0} />
```