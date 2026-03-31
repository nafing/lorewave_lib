# ContextMenu

`ContextMenu` otwiera menu pod prawym przyciskiem myszy. Korzysta z tego samego systemu elementow co `Menu`, ale pozycjonuje dropdown wzgledem punktu klikniecia.

## Import

```tsx
import { ContextMenu } from 'lorewave_lib'
```

## Kluczowe propsy

- `disabled`: wylacza reakcje na `contextmenu`
- `width`: szerokosc dropdownu
- `withinPortal`: renderowanie warstwy przez `Portal`

## Subkomponenty

- `ContextMenu.Target`
- `ContextMenu.Dropdown`
- `ContextMenu.Item`
- `ContextMenu.Divider`
- `ContextMenu.Label`
- `ContextMenu.CheckboxItem`
- `ContextMenu.RadioGroup`
- `ContextMenu.RadioItem`
- `ContextMenu.Submenu`

## Przyklad

```tsx
<ContextMenu>
  <ContextMenu.Target>
    <div>Kliknij prawym przyciskiem</div>
  </ContextMenu.Target>
  <ContextMenu.Dropdown>
    <ContextMenu.Item>Kopiuj</ContextMenu.Item>
    <ContextMenu.Item>Wklej</ContextMenu.Item>
  </ContextMenu.Dropdown>
</ContextMenu>
```