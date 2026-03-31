# Switch

`Switch` renderuje przelacznik binarny z etykieta, opisem i obsluga tych samych wrapper props co inne pola formularza.

## Import

```tsx
import { Switch } from 'lorewave_lib'
```

## Kluczowe propsy

- `label`: glowna etykieta obok przelacznika
- `description`, `error`, `hint`: metadane formularzowe
- `required`, `withAsterisk`: oznaczenie wymagalnosci
- `size`: `xs | sm | md | lg | xl`, domyslnie `md`
- spacing props: stylowanie wrappera

Komponent dziedziczy natywne propsy `input[type="checkbox"]`.

## Przyklad

```tsx
<Switch description="Wyslij powiadomienie email" label="Powiadomienia" />
```