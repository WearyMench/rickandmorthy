import { useState, useEffect } from "react";
import { fetchData } from "../Api";
import EpisodesCards from "../components/EpisodesCards";
import Loader from "../components/Loader";
import { useSearch } from "../hooks/useSearch";

import "../styles/EpisodesPage.css";

function Episodes() {
  const [episodeData, setEpisodeData] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, searchError, isSearching, handleSearch, clearSearch } =
    useSearch("episode");

  useEffect(() => {
    if (!searchQuery) {
      getData();
    }
  }, [page, searchQuery]);

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchData(`episode?page=${page}`);
      setEpisodeData(data);
    } catch (error) {
      setError("Failed to load episodes. Please try again later.");
      console.error("Error loading episodes:", error);
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
    if (episodeData && page < episodeData.info.pages) {
      setPage(page + 1);
    }
  };

  if (loading || isSearching) {
    return <Loader />;
  }

  const displayData = searchResults || episodeData;

  return (
    <div className="episodes">
      <div className="episodes__header">
        <h1 className="episodes__title">All Episodes</h1>
        <form className="episodes__form" onSubmit={handleSubmit}>
          <div className="episodes__search-container">
            <input
              type="text"
              name="episode"
              id="episode"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="episodes__input"
            />
            <div className="episodes__buttons">
              <input
                type="submit"
                value="Search"
                className="episodes__submit"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="episodes__clear"
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
        <div className="episodes__content">
          <div className="grid">
            <EpisodesCards data={displayData} />
          </div>
          {!searchResults && (
            <div className="episodes__pagination">
              <button
                className={`episodes__arrow ${
                  page <= 1 ? "episodes__arrow--disabled" : ""
                }`}
                onClick={nextPage}
                disabled={page <= 1}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <div className="episodes__page-info">
                {page} of {episodeData ? episodeData.info.pages : "0"}
              </div>
              <button
                className={`episodes__arrow ${
                  episodeData && page >= episodeData.info.pages
                    ? "episodes__arrow--disabled"
                    : ""
                }`}
                onClick={prevPage}
                disabled={episodeData && page >= episodeData.info.pages}
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="episodes__no-results">
          <p>
            No episodes found. Try a different search term or clear the search.
          </p>
        </div>
      )}
    </div>
  );
}

export default Episodes;
