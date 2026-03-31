# Tooltip

`Tooltip` pokazuje niewielka warstwe informacyjna po najechaniu lub fokusie na elemencie docelowym.

## Import

```tsx
import { Tooltip } from 'lorewave_lib'
```

## Kluczowe propsy

- `label`: tresc tooltipa
- `position`: `top | top-start | top-end | right | bottom | bottom-start | bottom-end | left`, domyslnie `top`
- `offset`: odstep od elementu docelowego, domyslnie `8`
- `openDelay`, `closeDelay`: opoznienia otwierania i zamykania
- `disabled`: wylacza wyswietlanie tooltipa
- `withinPortal`: decyduje, czy warstwa ma byc renderowana przez `Portal`

## Przyklad

```tsx
<Tooltip label="Edytuj rekord" position="bottom">
  <button type="button">Edytuj</button>
</Tooltip>
```