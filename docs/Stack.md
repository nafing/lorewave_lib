# Stack

`Stack` ustawia dzieci pionowo. To wariant `Flex` z wymuszonym `direction="column"`.

## Import

```tsx
import { Stack } from 'lorewave_lib'
```

## Kluczowe propsy

- przyjmuje propsy `Flex` poza `direction`
- `align`: wyrownanie elementow na osi poziomej
- `justify`: rozklad na osi pionowej
- `gap`: najwygodniejszy sposob na odstepy miedzy dziecmi

## Przyklad

```tsx
<Stack gap="md">
  <div>Naglowek</div>
  <div>Tresc</div>
  <div>Stopka</div>
</Stack>
```