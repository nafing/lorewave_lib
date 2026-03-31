# Popover

`Popover` to komponent zlozony do wyswietlania niestandardowej warstwy przy elemencie docelowym po kliknieciu.

## Import

```tsx
import { Popover } from 'lorewave_lib'
```

## Kluczowe propsy

- `defaultOpened`, `opened`, `onChange`: obsluga trybu niekontrolowanego i kontrolowanego
- `position`: pozycja overlayu, domyslnie `bottom-start`
- `offset`: odstep od targetu, domyslnie `8`
- `width`: szerokosc dropdownu
- `disabled`: zamyka i blokuje otwieranie komponentu
- `withinPortal`: renderowanie overlayu przez `Portal`

## Subkomponenty

- `Popover.Target`: element uruchamiajacy popover
- `Popover.Dropdown`: zawartosc wyswietlanej warstwy

## Przyklad

```tsx
<Popover>
  <Popover.Target>
    <button type="button">Filtry</button>
  </Popover.Target>
  <Popover.Dropdown width={280}>
    Zawartosc panelu
  </Popover.Dropdown>
</Popover>
```