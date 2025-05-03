import { useState, useEffect } from "react";
import { fetchData } from "../Api";
import CharacterCards from "../components/CharacterCards";
import Loader from "../components/Loader";
import { useSearch } from "../hooks/useSearch";

import "../styles/CharactersPage.css";

function Characters() {
  const [characterData, setCharacterData] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, searchError, isSearching, handleSearch, clearSearch } =
    useSearch("character");

  useEffect(() => {
    if (!searchQuery) {
      getData();
    }
  }, [page, searchQuery]);

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchData(`character?page=${page}`);
      setCharacterData(data);
    } catch (error) {
      setError("Failed to load characters. Please try again later.");
      console.error("Error loading characters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await handleSearch(searchQuery);
    } else {
      handleClearSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    clearSearch();
    getData();
  };

  const nextPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const prevPage = () => {
    if (characterData && page < characterData.info.pages) {
      setPage(page + 1);
    }
  };

  if (loading || isSearching) {
    return <Loader />;
  }

  const displayData = searchResults || characterData;

  return (
    <div className="characters">
      <div className="characters__header">
        <h1 className="characters__title">All Characters</h1>
        <form className="characters__form" onSubmit={handleSubmit}>
          <div className="characters__search-container">
            <input
              type="text"
              name="character"
              id="character"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="characters__input"
            />
            <div className="characters__buttons">
              <input
                type="submit"
                value="Search"
                className="characters__submit"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="characters__clear"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {(error || searchError) && (
        <div className="error-message">{error || searchError}</div>
      )}

      {displayData && displayData.results.length > 0 ? (
        <div className="characters__content">
          <div className="grid">
            <CharacterCards data={displayData} />
          </div>
          {!searchResults && (
            <div className="characters__pagination">
              <button
                className={`characters__arrow ${
                  page <= 1 ? "characters__arrow--disabled" : ""
                }`}
                onClick={nextPage}
                disabled={page <= 1}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <div className="characters__page-info">
                {page} of {characterData ? characterData.info.pages : "0"}
              </div>
              <button
                className={`characters__arrow ${
                  characterData && page >= characterData.info.pages
                    ? "characters__arrow--disabled"
                    : ""
                }`}
                onClick={prevPage}
                disabled={characterData && page >= characterData.info.pages}
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="characters__no-results">
          <p>
            No characters found. Try a different search term or clear the
            search.
          </p>
        </div>
      )}
    </div>
  );
}

export default Characters;
