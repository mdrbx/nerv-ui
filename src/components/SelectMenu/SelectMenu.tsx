"use client";

import {
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface SelectMenuOption {
  value: string;
  label: string;
  disabled?: boolean;
}

type SelectMenuValue = string | string[];

export interface SelectMenuProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "defaultValue" | "multiple" | "size" | "value"
  > {
  /** Label text */
  label?: string;
  /** Options to display */
  options: SelectMenuOption[];
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Optional className for wrapper */
  wrapperClassName?: string;
  /** Enable selecting multiple values */
  multiple?: boolean;
  /** Enable local filtering */
  filter?: boolean;
  /** Controlled value */
  value?: SelectMenuValue;
  /** Uncontrolled initial value */
  defaultValue?: SelectMenuValue;
  /** Value change helper for single and multi modes */
  onValueChange?: (value: SelectMenuValue) => void;
}

const colorMap = {
  orange: { text: "text-nerv-orange", border: "border-nerv-orange" },
  green: { text: "text-nerv-green", border: "border-nerv-green" },
  cyan: { text: "text-nerv-cyan", border: "border-nerv-cyan" },
};

const sizeMap = {
  sm: "min-h-[34px] px-3 py-1.5 text-xs",
  md: "min-h-[42px] px-4 py-2.5 text-sm",
  lg: "min-h-[48px] px-5 py-3 text-base",
};

const customSizeMap = sizeMap;

const tagBudgetBySize = {
  sm: 18,
  md: 28,
  lg: 34,
};

function normalizeValue(value: SelectMenuValue | undefined, multiple: boolean) {
  if (Array.isArray(value)) {
    const filtered = value.filter((item) => item !== "");
    return multiple ? Array.from(new Set(filtered)) : filtered.slice(0, 1);
  }

  if (typeof value === "string" && value !== "") {
    return [value];
  }

  return [];
}

function getActiveIndex(
  options: SelectMenuOption[],
  selectedValues: string[],
  previousIndex: number
) {
  const previous = options[previousIndex];
  if (previous && !previous.disabled) {
    return previousIndex;
  }

  const selectedIndex = options.findIndex(
    (option) => selectedValues.includes(option.value) && !option.disabled
  );
  if (selectedIndex >= 0) {
    return selectedIndex;
  }

  return options.findIndex((option) => !option.disabled);
}

function getNextEnabledIndex(
  options: SelectMenuOption[],
  currentIndex: number,
  direction: 1 | -1
) {
  if (options.length === 0) {
    return -1;
  }

  const start = currentIndex >= 0 ? currentIndex : direction === 1 ? -1 : 0;

  for (let offset = 1; offset <= options.length; offset += 1) {
    const index =
      (start + direction * offset + options.length) % options.length;
    if (!options[index]?.disabled) {
      return index;
    }
  }

  return currentIndex;
}

function getVisibleTagCount(
  labels: string[],
  size: "sm" | "md" | "lg",
  availableWidth: number | null
) {
  if (labels.length <= 1) {
    return labels.length;
  }

  const budget =
    availableWidth && availableWidth > 0
      ? Math.max(12, Math.floor((availableWidth - 56) / 8))
      : tagBudgetBySize[size];

  let used = 0;

  for (let index = 0; index < labels.length; index += 1) {
    const remaining = labels.length - index - 1;
    const reserve = remaining > 0 ? String(remaining).length + 5 : 0;
    const units = labels[index].length + 6;

    if (used + units + reserve > budget) {
      return Math.max(1, index);
    }

    used += units;
  }

  return labels.length;
}

function areValuesEqual(left: string[], right: string[]) {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((value, index) => value === right[index]);
}

export const SelectMenu = forwardRef<HTMLSelectElement, SelectMenuProps>(
  function SelectMenu(
    {
      label,
      options,
      color = "orange",
      size = "md",
      placeholder = "SELECT...",
      error,
      wrapperClassName = "",
      className = "",
      id,
      multiple = false,
      filter = false,
      value,
      defaultValue,
      onValueChange,
      disabled,
      name,
      required,
      form,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const selectId = id || generatedId;
    const nativeSelectId = `${selectId}-native`;
    const listboxId = `${selectId}-listbox`;
    const searchInputId = `${selectId}-filter`;
    const isCustomMode = multiple || filter;
    const c = colorMap[color];
    const isControlled = value !== undefined;
    const initialDefaultValuesRef = useRef(
      normalizeValue(defaultValue, multiple)
    );
    const [internalValues, setInternalValues] = useState(
      initialDefaultValuesRef.current
    );
    const selectedValues = isControlled
      ? normalizeValue(value, multiple)
      : internalValues;
    const selectedValue = selectedValues[0] ?? "";
    const [nativeValues, setNativeValues] = useState(selectedValues);
    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const [tagAreaWidth, setTagAreaWidth] = useState<number | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const filterInputRef = useRef<HTMLInputElement>(null);
    const tagAreaRef = useRef<HTMLDivElement>(null);
    const nativeSelectRef = useRef<HTMLSelectElement>(null);
    const pendingNativeChangeRef = useRef(false);
    const optionMap = new Map(options.map((option) => [option.value, option]));
    const selectedOptions = selectedValues
      .map((selected) => optionMap.get(selected))
      .filter((option): option is SelectMenuOption => Boolean(option));
    const visibleOptions =
      filter && searchTerm.trim()
        ? options.filter((option) => {
            const haystack = `${option.label} ${option.value}`.toLowerCase();
            return haystack.includes(searchTerm.trim().toLowerCase());
          })
        : options;
    const activeDescendantId =
      activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;
    const selectedLabels = selectedOptions.map((option) => option.label);
    const visibleTagCount = getVisibleTagCount(
      selectedLabels,
      size,
      tagAreaWidth
    );
    const visibleTags = selectedOptions.slice(0, visibleTagCount);
    const overflowCount = selectedOptions.length - visibleTags.length;
    const selectBorderClass = error
      ? "border-2 border-nerv-red"
      : focused || open
        ? `border-2 ${c.border}`
        : "border border-nerv-mid-gray";

    useImperativeHandle(ref, () => nativeSelectRef.current as HTMLSelectElement);

    useEffect(() => {
      if (!isCustomMode || !tagAreaRef.current) {
        return;
      }

      const node = tagAreaRef.current;
      const updateWidth = () => {
        const nextWidth = node.getBoundingClientRect().width;
        setTagAreaWidth(nextWidth > 0 ? nextWidth : null);
      };

      updateWidth();

      if (typeof ResizeObserver === "undefined") {
        return;
      }

      const observer = new ResizeObserver(() => updateWidth());
      observer.observe(node);

      return () => observer.disconnect();
    }, [isCustomMode, selectedLabels.length]);

    useEffect(() => {
      if (areValuesEqual(nativeValues, selectedValues)) {
        return;
      }

      setNativeValues(selectedValues);
    }, [nativeValues, selectedValues]);

    useEffect(() => {
      if (!isCustomMode || !open) {
        return;
      }

      setActiveIndex((previousIndex) =>
        getActiveIndex(visibleOptions, selectedValues, previousIndex)
      );
    }, [isCustomMode, open, selectedValues, visibleOptions]);

    useEffect(() => {
      if (!isCustomMode || !open) {
        return;
      }

      const handleClickOutside = (event: MouseEvent) => {
        if (rootRef.current?.contains(event.target as Node)) {
          return;
        }

        setOpen(false);
        setSearchTerm("");
        setActiveIndex(-1);
        setFocused(false);
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isCustomMode, open]);

    useEffect(() => {
      if (!isCustomMode || !pendingNativeChangeRef.current) {
        return;
      }

      pendingNativeChangeRef.current = false;
      nativeSelectRef.current?.dispatchEvent(new Event("change", { bubbles: true }));
    }, [isCustomMode, nativeValues]);

    useEffect(() => {
      if (!isCustomMode || isControlled) {
        return;
      }

      const select = nativeSelectRef.current;
      const ownerForm =
        (form && document.getElementById(form) instanceof HTMLFormElement
          ? (document.getElementById(form) as HTMLFormElement)
          : null) ?? select?.form;

      if (!ownerForm) {
        return;
      }

      const handleReset = () => {
        setInternalValues(initialDefaultValuesRef.current);
        setSearchTerm("");
        setOpen(false);
        setActiveIndex(-1);
      };

      ownerForm.addEventListener("reset", handleReset);
      return () => ownerForm.removeEventListener("reset", handleReset);
    }, [form, isControlled, isCustomMode]);

    const commitValue = (nextValues: string[]) => {
      if (!isControlled) {
        setInternalValues(nextValues);
      }

      setNativeValues(nextValues);
      pendingNativeChangeRef.current = true;
      onValueChange?.(multiple ? nextValues : (nextValues[0] ?? ""));
    };

    const closeMenu = (restoreFocus = false) => {
      setOpen(false);
      setSearchTerm("");
      setActiveIndex(-1);

      if (restoreFocus) {
        triggerRef.current?.focus();
      }
    };

    const openMenu = () => {
      if (disabled) {
        return;
      }

      setOpen(true);
      setActiveIndex(getActiveIndex(visibleOptions, selectedValues, -1));
    };

    const toggleMenu = () => {
      if (open) {
        closeMenu();
        return;
      }

      openMenu();
    };

    const handleOptionSelect = (option: SelectMenuOption) => {
      if (option.disabled) {
        return;
      }

      if (multiple) {
        const isSelected = selectedValues.includes(option.value);
        const nextValues = isSelected
          ? selectedValues.filter((valueItem) => valueItem !== option.value)
          : [...selectedValues, option.value];

        commitValue(nextValues);
        return;
      }

      commitValue([option.value]);
      closeMenu(true);
    };

    const moveActiveOption = (direction: 1 | -1) => {
      setActiveIndex((currentIndex) =>
        getNextEnabledIndex(visibleOptions, currentIndex, direction)
      );
    };

    const handleCustomKeyDown = (
      event: ReactKeyboardEvent<HTMLButtonElement | HTMLInputElement>
    ) => {
      if (disabled) {
        return;
      }

      if (!open) {
        if (
          event.key === "ArrowDown" ||
          event.key === "ArrowUp" ||
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          openMenu();
        }
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key === "Tab") {
        closeMenu(false);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveActiveOption(1);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveActiveOption(-1);
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const activeOption = visibleOptions[activeIndex];
        if (activeOption) {
          handleOptionSelect(activeOption);
        }
        return;
      }

      if (event.key === " " && !filter) {
        event.preventDefault();
        const activeOption = visibleOptions[activeIndex];
        if (activeOption) {
          handleOptionSelect(activeOption);
        }
      }
    };

    const handleWrapperFocus = (
      event: ReactFocusEvent<HTMLDivElement, Element>
    ) => {
      if (!isCustomMode) {
        return;
      }

      if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
        if (!focused) {
          setFocused(true);
        }
        onFocus?.(event as unknown as ReactFocusEvent<HTMLSelectElement>);
      }
    };

    const handleWrapperBlur = (
      event: ReactFocusEvent<HTMLDivElement, Element>
    ) => {
      if (!isCustomMode) {
        return;
      }

      if (rootRef.current?.contains(event.relatedTarget as Node | null)) {
        return;
      }

      setFocused(false);
      setOpen(false);
      setSearchTerm("");
      setActiveIndex(-1);
      onBlur?.(event as unknown as ReactFocusEvent<HTMLSelectElement>);
    };

    return (
      <div
        ref={rootRef}
        className={`flex w-full flex-col gap-1.5 ${wrapperClassName}`}
        onFocusCapture={handleWrapperFocus}
        onBlurCapture={handleWrapperBlur}
      >
        {label && (
          <label
            htmlFor={selectId}
            className={`text-xs uppercase tracking-[0.2em] font-bold ${c.text}`}
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            <span className="opacity-50 mr-1">//</span>
            {label}
          </label>
        )}

        {!isCustomMode && (
          <div className="relative">
            <span
              className={`pointer-events-none absolute left-[-0.85rem] top-1/2 -translate-y-1/2 text-lg font-mono transition-all duration-100 ${
                focused ? `${c.text} opacity-100` : "opacity-0"
              }`}
            >
              {"<"}
            </span>

            <div className="relative flex-1">
              <select
                id={selectId}
                ref={nativeSelectRef}
                disabled={disabled}
                onFocus={(event) => {
                  setFocused(true);
                  onFocus?.(event);
                }}
                onBlur={(event) => {
                  setFocused(false);
                  onBlur?.(event);
                }}
                onChange={(event) => {
                  onChange?.(event);
                  onValueChange?.(event.target.value);
                }}
                value={value !== undefined ? selectedValue : undefined}
                defaultValue={value === undefined ? selectedValue : undefined}
                className={`
                  w-full appearance-none bg-nerv-black font-mono cursor-pointer
                  ${selectBorderClass}
                  ${c.text}
                  ${sizeMap[size]}
                  pr-8 outline-none transition-all duration-100
                  disabled:cursor-not-allowed disabled:opacity-60
                  ${className}
                `}
                style={{ fontFamily: "var(--font-nerv-mono)" }}
                name={name}
                required={required}
                form={form}
                {...props}
              >
                {placeholder && (
                  <option value="" disabled>
                    {placeholder}
                  </option>
                )}
                {options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>

              <div
                className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${c.text}`}
              >
                <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                  <path d="M0 0L5 6L10 0H0Z" />
                </svg>
              </div>
            </div>

            <span
              className={`pointer-events-none absolute right-[-0.85rem] top-1/2 -translate-y-1/2 text-lg font-mono transition-all duration-100 ${
                focused ? `${c.text} opacity-100` : "opacity-0"
              }`}
            >
              {">"}
            </span>
          </div>
        )}

        {isCustomMode && (
          <div className="relative">
            <span
              className={`pointer-events-none absolute left-[-0.85rem] top-1/2 -translate-y-1/2 text-lg font-mono transition-all duration-100 ${
                focused || open ? `${c.text} opacity-100` : "opacity-0"
              }`}
            >
              {"<"}
            </span>

            <div className="relative flex-1">
              <button
                id={selectId}
                ref={triggerRef}
                type="button"
                disabled={disabled}
                role="combobox"
                aria-expanded={open}
                aria-controls={listboxId}
                aria-haspopup="listbox"
                aria-activedescendant={open ? activeDescendantId : undefined}
                aria-invalid={error ? true : undefined}
                aria-disabled={disabled ? true : undefined}
                className={`
                  relative w-full bg-nerv-black font-mono text-left
                  ${selectBorderClass}
                  ${c.text}
                  ${customSizeMap[size]}
                  pr-10 outline-none transition-all duration-100
                  disabled:cursor-not-allowed disabled:opacity-60
                  ${className}
                `}
                style={{ fontFamily: "var(--font-nerv-mono)" }}
                onClick={toggleMenu}
                onKeyDown={handleCustomKeyDown}
              >
                <div
                  ref={tagAreaRef}
                  className="min-w-0 overflow-hidden"
                >
                  {multiple ? (
                    <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
                      {selectedOptions.length === 0 && (
                        <span className="block truncate text-nerv-mid-gray">
                          {placeholder}
                        </span>
                      )}
                      {visibleTags.map((option) => (
                        <span
                          key={option.value}
                          className="inline-flex min-w-0 max-w-[11rem] items-center border border-current/40 bg-nerv-dark-gray/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]"
                        >
                          <span className="truncate">{option.label}</span>
                        </span>
                      ))}
                      {overflowCount > 0 && (
                        <span className="inline-flex shrink-0 items-center border border-current/40 bg-nerv-dark-gray/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                          +{overflowCount}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span
                      className={`block truncate ${
                        selectedOptions[0] ? "" : "text-nerv-mid-gray"
                      }`}
                    >
                      {selectedOptions[0]?.label || placeholder}
                    </span>
                  )}
                </div>

                <div
                  className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-100 ${
                    open ? "rotate-180" : ""
                  } ${c.text}`}
                >
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                    <path d="M0 0L5 6L10 0H0Z" />
                  </svg>
                </div>
              </button>

            <select
                id={nativeSelectId}
                ref={nativeSelectRef}
                multiple={multiple}
                value={multiple ? nativeValues : (nativeValues[0] ?? "")}
                onChange={onChange ?? (() => {})}
                name={name}
                required={required}
                form={form}
                disabled={disabled}
                aria-hidden="true"
                tabIndex={-1}
                className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
                {...props}
              >
                {!multiple && placeholder && (
                  <option value="" disabled>
                    {placeholder}
                  </option>
                )}
                {options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>

              {open && (
                <div
                  className={`absolute left-0 right-0 z-50 mt-1 border ${c.border} bg-nerv-black shadow-[0_0_0_1px_rgba(0,0,0,0.45)]`}
                >
                  {filter && (
                    <div className="border-b border-nerv-mid-gray/60 px-3 py-2">
                      <input
                        id={searchInputId}
                        ref={filterInputRef}
                        type="text"
                        autoFocus
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        onKeyDown={handleCustomKeyDown}
                        placeholder="FILTER OPTIONS..."
                        aria-label={label ? `${label} filter` : "Filter options"}
                        className={`
                          w-full border border-nerv-mid-gray bg-nerv-dark-gray/40
                          px-3 py-2 font-mono text-xs outline-none transition-colors
                          focus:border-current ${c.text} placeholder:text-nerv-mid-gray
                        `}
                        style={{ fontFamily: "var(--font-nerv-mono)" }}
                      />
                    </div>
                  )}

                  <div
                    id={listboxId}
                    role="listbox"
                    aria-multiselectable={multiple || undefined}
                    className="max-h-64 overflow-y-auto py-1"
                  >
                    {visibleOptions.length === 0 && (
                      <div
                        className="px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-nerv-mid-gray"
                        style={{ fontFamily: "var(--font-nerv-mono)" }}
                      >
                        NO MATCHES
                      </div>
                    )}

                    {visibleOptions.map((option, index) => {
                      const isSelected = selectedValues.includes(option.value);
                      const isActive = index === activeIndex;

                      return (
                        <div
                          key={option.value}
                          id={`${listboxId}-option-${index}`}
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={option.disabled || undefined}
                          className={`
                            flex cursor-pointer items-center justify-between gap-3 px-4 py-2
                            text-xs uppercase tracking-[0.16em] transition-colors
                            ${
                              option.disabled
                                ? "cursor-not-allowed opacity-35"
                                : isActive
                                  ? "bg-nerv-white/8"
                                  : "hover:bg-nerv-white/[0.04]"
                            }
                            ${isSelected ? c.text : "text-nerv-white"}
                          `}
                          style={{ fontFamily: "var(--font-nerv-mono)" }}
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => handleOptionSelect(option)}
                        >
                          <span className="min-w-0 truncate">{option.label}</span>
                          <span className="shrink-0 text-[10px] text-current/70">
                            {multiple
                              ? isSelected
                                ? "[x]"
                                : "[ ]"
                              : isSelected
                                ? "<-"
                                : ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <span
              className={`pointer-events-none absolute right-[-0.85rem] top-1/2 -translate-y-1/2 text-lg font-mono transition-all duration-100 ${
                focused || open ? `${c.text} opacity-100` : "opacity-0"
              }`}
            >
              {">"}
            </span>
          </div>
        )}

        {error && (
          <span className="text-xs text-nerv-red font-mono">
            <span className="text-[10px]">!</span> {error}
          </span>
        )}
      </div>
    );
  }
);
