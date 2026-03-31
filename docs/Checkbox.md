# Checkbox

`Checkbox` renderuje pole wyboru z etykieta i pelnym wrapperem formularzowym.

## Import

```tsx
import { Checkbox } from 'lorewave_lib'
```

## Kluczowe propsy

- `label`: tekst po prawej stronie pola
- `description`, `error`, `hint`: metadane formularzowe
- `required`, `withAsterisk`: oznaczenie wymagalnosci
- `size`: `xs | sm | md | lg | xl`, domyslnie `md`
- spacing props: stylowanie wrappera

Komponent dziedziczy natywne propsy `input[type="checkbox"]`.

## Przyklad

```tsx
<Checkbox label="Akceptuje regulamin" required />
```