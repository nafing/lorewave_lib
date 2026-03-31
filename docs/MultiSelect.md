# MultiSelect

`MultiSelect` dziala podobnie do `Select`, ale pozwala wybrac wiele opcji i pokazuje je w triggerze jako zestaw pilli.

## Import

```tsx
import { MultiSelect } from 'lorewave_lib'
```

## Kluczowe propsy

- `data`: tablica `SelectOption[]`, wymagana
- `value`, `defaultValue`, `onChange`: pracuja na tablicy stringow
- `searchable`, `searchPlaceholder`, `nothingFound`: inline wyszukiwanie w kontrolce
- `placeholder`: tresc bez zaznaczonych opcji
- `name`: dla kazdej zaznaczonej wartosci renderowany jest ukryty `input`
- `label`, `description`, `error`, `hint`, `required`, `withAsterisk`: wrapper formularza
- `size`, `radius`, `bg`, `color`: stylowanie kontrola

## Przyklad

```tsx
<MultiSelect
  data={[
    { value: 'react', label: 'React' },
    { value: 'ts', label: 'TypeScript' },
  ]}
  label="Technologie"
  searchable
/>
```

W trybie `searchable` pole wyszukiwania jest renderowane obok pilli wybranych wartosci. Po wyborze opcji filtr sie czysci, a `Backspace` przy pustym polu usuwa ostatnia zaznaczona wartosc.

Lista opcji korzysta z `ScrollArea`, dzieki czemu scroll dropdownu jest spojny z pozostala czescia biblioteki.