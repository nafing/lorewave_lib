import { IconCheck, IconChevronDown } from '@tabler/icons-react'
import { useDeferredValue, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import styles from './index.module.css'
import fieldStyles from '../_shared/field.module.css'
import dropdownStyles from '../_shared/select.module.css'
import { FieldRoot, fieldSizeClassNames, fieldVariantClassNames, getFieldLayout, type FieldSize, type FieldVariant, type FieldWrapperProps } from '../_shared/field'
import { filterSelectOptions, findSelectOptions, type SelectOption, useDismissableLayer } from '../_shared/select'
import { className } from '../../utils'
import type { StyleProps } from '../../utils'

export type MultiSelectProps = StyleProps &
  FieldWrapperProps & {
    className?: string
    data: SelectOption[]
    defaultValue?: string[]
    disabled?: boolean
    id?: string
    name?: string
    nothingFound?: ReactNode
    onChange?: (value: string[], options: SelectOption[]) => void
    placeholder?: ReactNode
    searchable?: boolean
    searchPlaceholder?: string
    size?: FieldSize
    style?: CSSProperties
    value?: string[]
    variant?: FieldVariant
  }

export const MultiSelect = ({
  className: customClassName,
  data,
  defaultValue = [],
  description,
  disabled,
  error,
  hint,
  id,
  label,
  name,
  nothingFound = 'No options',
  onChange,
  placeholder = 'Select values',
  required,
  searchable = false,
  searchPlaceholder = 'Search...',
  size = 'md',
  style,
  value,
  variant = 'default',
  withAsterisk,
  ...props
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(defaultValue)
  const deferredSearch = useDeferredValue(search)
  const currentValue = value === undefined ? uncontrolledValue : value
  const selectedOptions = findSelectOptions(data, currentValue)
  const filteredData = filterSelectOptions(data, deferredSearch)
  const dropdownId = useId()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const { controlStyles, wrapperStyles } = getFieldLayout({ ...props, description, error, hint, label, required, size, style, variant, withAsterisk })

  useDismissableLayer(rootRef, () => setOpen(false), open)

  useEffect(() => {
    if (disabled && open) {
      setOpen(false)
    }
  }, [disabled, open])

  useEffect(() => {
    if (!open) {
      setSearch('')
      return
    }

    if (searchable) {
      searchInputRef.current?.focus()
    }
  }, [open, searchable])

  const handleToggle = (option: SelectOption) => {
    if (option.disabled) {
      return
    }

    const isSelected = currentValue.includes(option.value)
    const nextValue = isSelected ? currentValue.filter((item) => item !== option.value) : [...currentValue, option.value]
    const nextOptions = findSelectOptions(data, nextValue)

    if (value === undefined) {
      setUncontrolledValue(nextValue)
    }

    onChange?.(nextValue, nextOptions)
  }

  return (
    <FieldRoot description={description} error={error} hint={hint} label={label} required={required} style={{ ...wrapperStyles, ...style }} withAsterisk={withAsterisk}>
      <div className={dropdownStyles.root} ref={rootRef}>
        {name &&
          currentValue.map((item) => <input key={item} name={name} type="hidden" value={item} />)}
        <button
          aria-controls={dropdownId}
          aria-expanded={open}
          className={className(
            fieldStyles.control,
            fieldStyles[fieldSizeClassNames[size]],
            fieldStyles[fieldVariantClassNames[variant]],
            dropdownStyles.trigger,
            styles.trigger,
            styles.root,
            customClassName,
          )}
          disabled={disabled}
          id={id}
          onClick={() => setOpen((currentOpen) => !currentOpen)}
          style={controlStyles}
          type="button"
        >
          <span className={className(dropdownStyles.triggerLabel, styles.values, selectedOptions.length === 0 && styles.placeholder)}>
            {selectedOptions.length > 0
              ? selectedOptions.map((option) => (
                  <span className={styles.pill} key={option.value}>
                    {option.label}
                  </span>
                ))
              : placeholder}
          </span>
          <IconChevronDown className={className(dropdownStyles.chevron, styles.chevron, open && dropdownStyles.chevronOpen)} size={18} stroke={1.8} />
        </button>

        {open && (
          <div aria-multiselectable="true" aria-orientation="vertical" className={dropdownStyles.dropdown} id={dropdownId} role="listbox">
            {searchable && (
              <input
                className={dropdownStyles.search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={searchPlaceholder}
                ref={searchInputRef}
                value={search}
              />
            )}
            {filteredData.length === 0 && <div className={dropdownStyles.empty}>{nothingFound}</div>}

            {filteredData.map((option) => {
              const isSelected = currentValue.includes(option.value)

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
                  onClick={() => handleToggle(option)}
                  role="option"
                  type="button"
                >
                  <span>{option.label}</span>
                  <IconCheck className={className(dropdownStyles.check, isSelected && dropdownStyles.checkVisible)} size={16} stroke={2} />
                </button>
              )}
            )}
          </div>
        )}
      </div>
    </FieldRoot>
  )
}

export type { SelectOption }