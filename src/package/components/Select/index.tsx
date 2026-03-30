import { IconCheck, IconChevronDown } from '@tabler/icons-react'
import { useDeferredValue, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import styles from './index.module.css'
import fieldStyles from '../_shared/field.module.css'
import dropdownStyles from '../_shared/select.module.css'
import { FieldRoot, fieldSizeClassNames, fieldVariantClassNames, getFieldLayout, type FieldSize, type FieldVariant, type FieldWrapperProps } from '../_shared/field'
import { filterSelectOptions, findSelectOption, type SelectOption, useDismissableLayer } from '../_shared/select'
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
    variant?: FieldVariant
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
  variant = 'default',
  withAsterisk,
  ...props
}: SelectProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(defaultValue)
  const deferredSearch = useDeferredValue(search)
  const currentValue = value === undefined ? uncontrolledValue : value
  const selectedOption = findSelectOption(data, currentValue)
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

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) {
      return
    }

    if (value === undefined) {
      setUncontrolledValue(option.value)
    }

    onChange?.(option.value, option)
    setOpen(false)
  }

  return (
    <FieldRoot description={description} error={error} hint={hint} label={label} required={required} style={{ ...wrapperStyles, ...style }} withAsterisk={withAsterisk}>
      <div className={dropdownStyles.root} ref={rootRef}>
        {name && currentValue != null && <input name={name} type="hidden" value={currentValue} />}
        <button
          aria-controls={dropdownId}
          aria-expanded={open}
          className={className(
            fieldStyles.control,
            fieldStyles[fieldSizeClassNames[size]],
            fieldStyles[fieldVariantClassNames[variant]],
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

        {open && (
          <div aria-orientation="vertical" className={dropdownStyles.dropdown} id={dropdownId} role="listbox">
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
        )}
      </div>
    </FieldRoot>
  )
}

export type { SelectOption }