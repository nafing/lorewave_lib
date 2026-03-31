# TextInput

`TextInput` renderuje pole tekstowe z opakowaniem formularzowym, etykieta, opisem i bledem.

## Import

```tsx
import { TextInput } from 'lorewave_lib'
```

## Kluczowe propsy

- `label`, `description`, `error`, `hint`: tresc pomocnicza pola
- `required`, `withAsterisk`: oznaczenie pola wymaganego
- `size`: `xs | sm | md | lg | xl`, domyslnie `md`
- `radius`, `bg`, `color`: stylowanie samego kontrola
- `m`, `p` i pozostale spacing props: stylowanie wrappera pola

Komponent dziedziczy natywne propsy `input` poza `type` i natywnym `size`.

## Przyklad

```tsx
<TextInput
  label="Email"
  placeholder="name@company.com"
  required
/>
```