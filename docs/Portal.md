# Portal

`Portal` przenosi renderowane dzieci poza biezace drzewo DOM. Domyslnie montuje zawartosc do `document.body`.

## Import

```tsx
import { Portal } from 'lorewave_lib'
```

## Kluczowe propsy

- `children`: zawartosc do przeniesienia
- `disabled`: gdy `true`, renderuje dzieci inline zamiast przez portal
- `target`: element `HTMLElement`, selektor CSS albo `null`

## Przyklad

```tsx
<Portal target="#modals-root">
  <div>Renderowane poza glownym drzewem</div>
</Portal>
```