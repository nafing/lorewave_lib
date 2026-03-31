# Menu

`Menu` to komponent zlozony do budowania rozwijanych menu akcji. Moze byc sterowany deklaratywnie albo przez tablice `items`.

## Import

```tsx
import { Menu } from 'lorewave_lib'
```

## Kluczowe propsy

- `defaultOpened`, `opened`, `onChange`: kontrola stanu otwarcia
- `items`: tablica `MenuEntry[]` do prostego renderowania menu z danych
- `position`: pozycja dropdownu, domyslnie `bottom-end`
- `offset`: odstep od targetu, domyslnie `8`
- `width`: szerokosc dropdownu
- `disabled`: blokuje otwieranie i zamyka aktywne menu
- `withinPortal`: renderowanie warstwy przez `Portal`

## Subkomponenty

- `Menu.Target`
- `Menu.Dropdown`
- `Menu.Item`
- `Menu.Divider`
- `Menu.Label`
- `Menu.CheckboxItem`
- `Menu.RadioGroup`
- `Menu.RadioItem`
- `Menu.Submenu`

## Typ danych `items`

- `MenuItem`: `label`, `onClick`, `leftSection`, `rightSection`, `description`, `danger`, `disabled`, `closeOnClick`
- `MenuDivider`: `type: 'divider'` oraz opcjonalne `label`

## Przyklad

```tsx
<Menu>
  <Menu.Target>
    <button type="button">Akcje</button>
  </Menu.Target>
  <Menu.Dropdown>
    <Menu.Item>Edytuj</Menu.Item>
    <Menu.Item danger>Usun</Menu.Item>
  </Menu.Dropdown>
</Menu>
```