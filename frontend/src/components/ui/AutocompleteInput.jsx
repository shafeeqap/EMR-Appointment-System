import React, { useEffect, useRef, useState } from "react";
import { InputField } from ".";
import useDebouncedSearch from "../../hooks/useDebouncedSearch";

const AutocompleteInput = ({
  label,
  value,
  onChange,
  onSelect,
  fetchItems,
  renderItem,
  placeholder,
  className,
  error,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebouncedSearch({ value });
  const containerRef = useRef();

  useEffect(() => {
    if (!debouncedSearch) {
      setOptions([]);
      setIsOpen(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const result = await fetchItems(debouncedSearch);
        setOptions(result || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [debouncedSearch, fetchItems]);

  // Outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!options.length) return;

    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) => (prev + 1) % options.length);
    }

    if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => (prev <= 0 ? options.length - 1 : prev - 1));
    }

    if (e.key === "Enter" && highlightIndex >= 0) {
      const selected = options[highlightIndex];
      handleSelected(selected);
    }
  };

  const handleSelected = (item) => {
    onSelect(item);
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  return (
    <>
      {/* Search */}
      <div className="relative" ref={containerRef}>
        <InputField
          type="text"
          label={label}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          error={error}
          className={`focus:ring focus:border-primary ${className}`}
        />

        {isOpen && (
          <ul className="absolute w-full bg-white border mt-1 max-h-40 overflow-y-auto shadow rounded z-10">
            {loading && (
              <li className="p-2 text-sm text-gray-500">Loading...</li>
            )}

            {!loading && options.length === 0 && (
              <li className="p-2 text-sm text-gray-500">No results</li>
            )}

            {options.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelected(item)}
                className={`px-3 cursor-pointer hover:bg-slate-100 ${
                  index === highlightIndex ? "bg-gray-100" : ""
                }`}
              >
                {renderItem(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AutocompleteInput;
