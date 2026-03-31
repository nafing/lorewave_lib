# Group

`Group` jest cienka nakladka na `Flex` ustawiona pod poziome grupowanie elementow. Wymusza `direction="row"`, `align="center"` i `wrap="wrap"`.

## Import

```tsx
import { Group } from 'lorewave_lib'
```

## Kluczowe propsy

- przyjmuje wszystkie propsy `Flex` poza `align`, `direction` i `wrap`
- najlepiej sprawdza sie do grup przyciskow, tagow i narzedzi akcji
- obsluguje `StyleProps`, w tym `gap`

## Przyklad

```tsx
<Group gap="sm" justify="space-between">
  <button>Anuluj</button>
  <button>Zapisz</button>
</Group>
```