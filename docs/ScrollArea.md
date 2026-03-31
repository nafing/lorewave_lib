# ScrollArea

`ScrollArea` opakowuje zawartosc w viewport z niestandardowymi paskami przewijania dla osi X i Y.

## Import

```tsx
import { ScrollArea } from 'lorewave_lib'
```

## Kluczowe propsy

- `h` lub `height`: wysokosc viewportu
- `mih` lub `minHeight`: minimalna wysokosc
- `mah` lub `maxHeight`: maksymalna wysokosc
- `scrollbarSize`: rozmiar paska przewijania, domyslnie `12`
- `scrollOffset`: dodaje offset na zawartosc, gdy scrollbar jest widoczny
- `viewportClassName`, `viewportStyle`: stylowanie wewnetrznego viewportu
- `StyleProps`: `m`, `p`, `bg`, `color`, `radius`

Komponent dziedziczy tez natywne propsy `HTMLDivElement`.

## Przyklad

```tsx
<ScrollArea h={320} p="sm" scrollOffset>
  <div>Dluga lista elementow</div>
</ScrollArea>
```