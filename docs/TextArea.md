# TextArea

`TextArea` renderuje wieloliniowe pole tekstowe z tym samym wrapperem formularzowym co pozostale pola.

## Import

```tsx
import { TextArea } from 'lorewave_lib'
```

## Kluczowe propsy

- `label`, `description`, `error`, `hint`: metadane pola
- `required`, `withAsterisk`: oznaczenie pola wymaganego
- `radius`, `bg`, `color`: stylowanie kontrola
- spacing props: stylowanie wrappera

Komponent dziedziczy natywne propsy `textarea`.

## Przyklad

```tsx
<TextArea label="Opis" placeholder="Wpisz szczegoly" rows={4} />
```