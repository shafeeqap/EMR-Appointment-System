import { useEffect, useState } from "react";

const useDebouncedSearch = ({ value, delay = 300 }) => {
  const [debouncedSearch, setDebouncedSearch] = useState(value || "");

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(value || "");
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedSearch;
};

export default useDebouncedSearch;
