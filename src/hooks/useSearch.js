import { useState, useCallback } from "react";
import { fetchData } from "../Api";

export const useSearch = (endpoint) => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    async (query) => {
      if (!query.trim()) {
        setSearchResults(null);
        return;
      }

      try {
        setIsSearching(true);
        setSearchError(null);
        const data = await fetchData(
          `${endpoint}?name=${encodeURIComponent(query)}`
        );
        setSearchResults(data);
      } catch (error) {
        setSearchError("No results found. Please try a different search term.");
        setSearchResults(null);
      } finally {
        setIsSearching(false);
      }
    },
    [endpoint]
  );

  const clearSearch = useCallback(() => {
    setSearchResults(null);
    setSearchError(null);
    setIsSearching(false);
  }, []);

  return {
    searchResults,
    searchError,
    isSearching,
    handleSearch,
    clearSearch,
  };
};
