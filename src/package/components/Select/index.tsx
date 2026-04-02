import { IconCheck, IconChevronDown } from '@tabler/icons-react'
import { useDeferredValue, useEffect, useId, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent, type ReactNode } from 'react'
import styles from './index.module.css'
import fieldStyles from '../_shared/field.module.css'
import dropdownStyles from '../_shared/select.module.css'
import { FieldRoot, fieldSizeClassNames, fieldVariantClassNames, getFieldLayout, useFieldControlId, type FieldSize, type FieldWrapperProps } from '../_shared/field'
import { ScrollArea } from '../ScrollArea'
import { filterSelectOptions, findSelectOption, getOptionSearchText, type SelectOption, useDismissableLayer } from '../_shared/select'
import { className } from '../../utils'
import type { StyleProps } from '../../utils'

export type SelectProps = StyleProps &
  FieldWrapperProps & {
    className?: string
    data: SelectOption[]
    defaultValue?: string | null
    disabled?: boolean
    id?: string
    name?: string
    nothingFound?: ReactNode
    onChange?: (value: string | null, option: SelectOption | null) => void
    placeholder?: ReactNode
    searchable?: boolean
    searchPlaceholder?: string
    size?: FieldSize
    style?: CSSProperties
    value?: string | null
  }

export const Select = ({
  className: customClassName,
  data,
  defaultValue = null,
  description,
  disabled,
  error,
  hint,
  id,
  label,
  name,
  nothingFound = 'No options',
  onChange,
  placeholder = 'Select value',
  required,
  searchable = false,
  searchPlaceholder = 'Search...',
  size = 'md',
  style,
  value,
  withAsterisk,
  ...props
}: SelectProps) => {
  const controlId = useFieldControlId(id)
  const [open, setOpen] = useState(false)
  const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(defaultValue)
  const currentValue = value === undefined ? uncontrolledValue : value
  const selectedOption = findSelectOption(data, currentValue)
  const [search, setSearch] = useState(() => (selectedOption ? getOptionSearchText(selectedOption) : ''))
  const deferredSearch = useDeferredValue(search)
  const filteredData = searchable ? filterSelectOptions(data, deferredSearch, { exactMatchReturnsAll: true }) : data
  const dropdownId = useId()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const { controlStyles, wrapperStyles } = getFieldLayout({ ...props, description, error, hint, label, required, size, style, withAsterisk })

  useDismissableLayer(rootRef, () => setOpen(false), open)

  useEffect(() => {
    if (disabled && open) {
      setOpen(false)
    }
  }, [disabled, open])

  useEffect(() => {
    if (!open || !searchable) {
      setSearch(selectedOption ? getOptionSearchText(selectedOption) : '')
    }
  }, [open, searchable, selectedOption])

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) {
      return
    }

    if (value === undefined) {
      setUncontrolledValue(option.value)
    }

    onChange?.(option.value, option)
    setSearch(getOptionSearchText(option))
    setOpen(false)
  }

  const handleSearchChange = (nextSearch: string) => {
    setSearch(nextSearch)
    setOpen(true)
  }

  const handleSearchBlur = (event: FocusEvent<HTMLInputElement>) => {
    const nextFocused = event.relatedTarget

    if (nextFocused instanceof Node && rootRef.current?.contains(nextFocused)) {
      return
    }

    setOpen(false)
    setSearch(selectedOption ? getOptionSearchText(selectedOption) : '')
  }

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter') {
      setOpen(true)
    }

    if (event.key === 'Escape') {
      setOpen(false)
      setSearch(selectedOption ? getOptionSearchText(selectedOption) : '')
      searchInputRef.current?.blur()
    }
  }

  return (
    <FieldRoot description={description} error={error} hint={hint} label={label} required={required} style={{ ...wrapperStyles, ...style }} withAsterisk={withAsterisk}>
      <div className={dropdownStyles.root} ref={rootRef}>
        {name && currentValue != null && <input name={name} type="hidden" value={currentValue} />}
        {searchable ? (
          <div className={styles.searchableRoot}>
            <input
              aria-autocomplete="list"
              aria-controls={dropdownId}
              aria-expanded={open}
              aria-haspopup="listbox"
              className={className(
                fieldStyles.control,
                fieldStyles[fieldSizeClassNames[size]],
                fieldStyles[fieldVariantClassNames.default],
                styles.searchInput,
                customClassName,
              )}
              disabled={disabled}
                id={controlId}
              onBlur={handleSearchBlur}
              onChange={(event) => handleSearchChange(event.target.value)}
              onClick={() => setOpen(true)}
              onFocus={() => setOpen(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder={search.length === 0 ? (typeof placeholder === 'string' ? placeholder : searchPlaceholder) : undefined}
              ref={searchInputRef}
              role="combobox"
              style={controlStyles}
              value={search}
            />
            <IconChevronDown className={className(styles.searchChevron, open && dropdownStyles.chevronOpen)} size={18} stroke={1.8} />
          </div>
        ) : (
          <button
            aria-controls={dropdownId}
            aria-expanded={open}
            className={className(
              fieldStyles.control,
              fieldStyles[fieldSizeClassNames[size]],
              fieldStyles[fieldVariantClassNames.default],
              dropdownStyles.trigger,
              styles.root,
              customClassName,
            )}
            disabled={disabled}
            id={id}
            onClick={() => setOpen((currentOpen) => !currentOpen)}
            style={controlStyles}
            type="button"
          >
            <span className={className(dropdownStyles.triggerLabel, styles.value, !selectedOption && styles.placeholder)}>
              {selectedOption?.label ?? placeholder}
            </span>
            <IconChevronDown className={className(dropdownStyles.chevron, open && dropdownStyles.chevronOpen)} size={18} stroke={1.8} />
          </button>
        )}

        {open && (
          <div aria-orientation="vertical" className={dropdownStyles.dropdown} id={dropdownId} role="listbox">
            <ScrollArea mah="16rem" scrollOffset scrollbarSize={10} viewportClassName={dropdownStyles.optionsViewport}>
              <div className={dropdownStyles.options}>
                {filteredData.length === 0 && <div className={dropdownStyles.empty}>{nothingFound}</div>}

                {filteredData.map((option) => {
                  const isSelected = option.value === selectedOption?.value

                  return (
                    <button
                      aria-selected={isSelected}
                      className={className(
                        dropdownStyles.option,
                        isSelected && dropdownStyles.optionSelected,
                        option.disabled && dropdownStyles.optionDisabled,
                      )}
                      disabled={option.disabled}
                      key={option.value}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleSelect(option)}
                      role="option"
                      type="button"
                    >
                      <span>{option.label}</span>
                      <IconCheck className={className(dropdownStyles.check, isSelected && dropdownStyles.checkVisible)} size={16} stroke={2} />
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </FieldRoot>
  )
}

export type { SelectOption }