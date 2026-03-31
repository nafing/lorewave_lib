# Select

`Select` renderuje jednokrotny wybor z listy opcji i opcjonalnym filtrowaniem po wpisanym tekscie.

## Import

```tsx
import { Select } from 'lorewave_lib'
```

## Kluczowe propsy

- `data`: tablica `SelectOption[]`, wymagana
- `value`, `defaultValue`, `onChange`: tryb kontrolowany i niekontrolowany
- `searchable`: zamienia kontrolke w pole tekstowe filtrowania, jak w Mantine
- `searchPlaceholder`: placeholder pola wyszukiwania
- `placeholder`: tresc pokazywana bez wybranej wartosci
- `nothingFound`: zawartosc dla pustego wyniku filtrowania
- `label`, `description`, `error`, `hint`, `required`, `withAsterisk`: wrapper formularza
- `size`, `radius`, `bg`, `color`: stylowanie kontrola

## Typ `SelectOption`

- `value`: identyfikator opcji
- `label`: renderowana etykieta
- `search`: opcjonalny tekst do filtrowania
- `disabled`: blokuje wybor opcji

## Przyklad

```tsx
<Select
  data={[
    { value: 'pl', label: 'Polski' },
    { value: 'en', label: 'English' },
  ]}
  label="Jezyk"
  searchable
/>
```

Po wybraniu opcji pole pokazuje etykiete wybranego elementu. Po focusie mozna od razu wpisywac filtr, a po opuszczeniu pola tekst wraca do aktualnie wybranej wartosci.

Dropdown opcji korzysta z `ScrollArea`, wiec dluzsze listy przewijaja sie tym samym mechanizmem co reszta biblioteki.