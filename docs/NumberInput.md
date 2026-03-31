# NumberInput

`NumberInput` renderuje pole liczbowe z opcjonalnymi przyciskami inkrementacji i dekrementacji.

## Import

```tsx
import { NumberInput } from 'lorewave_lib'
```

## Kluczowe propsy

- wspiera ten sam zestaw wrapper props co `TextInput`: `label`, `description`, `error`, `hint`, `required`, `withAsterisk`
- `size`: `xs | sm | md | lg | xl`, domyslnie `md`
- `withControls`: pokazuje przyciski `+` i `-`, domyslnie `true`
- `radius`, `bg`, `color`: stylowanie kontrola
- spacing props: stylowanie wrappera

Komponent dziedziczy natywne propsy `input` poza `type` i natywnym `size`.

## Przyklad

```tsx
<NumberInput label="Liczba miejsc" min={1} step={1} withControls />
```