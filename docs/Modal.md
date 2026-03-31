# Modal

`Modal` wyswietla dialog z backdropem, obsluga klawisza Escape, opcjonalnym blokowaniem scrolla i przyciskiem zamkniecia.

## Import

```tsx
import { Modal } from 'lorewave_lib'
```

## Kluczowe propsy

- `defaultOpened`, `opened`, `onChange`: tryb niekontrolowany i kontrolowany
- `onClose`: wywolywany po zamknieciu dialogu
- `title`, `description`: tresc naglowka dialogu
- `size`: szerokosc modala, domyslnie `32rem`
- `closeOnClickOutside`, `closeOnEscape`: kontrola mechanizmow zamykania
- `lockScroll`: blokuje przewijanie `body` podczas otwarcia
- `withinPortal`, `target`: miejsce montowania warstwy
- `withCloseButton`: pokazuje lub ukrywa przycisk zamkniecia

## Przyklad

```tsx
<Modal opened={opened} onChange={setOpened} title="Nowy projekt">
  Formularz tworzenia projektu
</Modal>
```