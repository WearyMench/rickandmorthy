import { useState, useEffect } from "react";
import { fetchData } from "../Api";
import LocationsCards from "../components/LocationsCards";
import Loader from "../components/Loader";
import { useSearch } from "../hooks/useSearch";

import "../styles/LocationsPage.css";

function Locations() {
  const [locationData, setLocationData] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, searchError, isSearching, handleSearch, clearSearch } =
    useSearch("location");

  useEffect(() => {
    if (!searchQuery) {
      getData();
    }
  }, [page, searchQuery]);

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchData(`location?page=${page}`);
      setLocationData(data);
    } catch (error) {
      setError("Failed to load locations. Please try again later.");
      console.error("Error loading locations:", error);
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
    if (locationData && page < locationData.info.pages) {
      setPage(page + 1);
    }
  };

  if (loading || isSearching) {
    return <Loader />;
  }

  const displayData = searchResults || locationData;

  return (
    <div className="locations">
      <div className="locations__header">
        <h1 className="locations__title">All Locations</h1>
        <form className="locations__form" onSubmit={handleSubmit}>
          <div className="locations__search-container">
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="locations__input"
            />
            <div className="locations__buttons">
              <input
                type="submit"
                value="Search"
                className="locations__submit"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="locations__clear"
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
        <div className="locations__content">
          <div className="grid">
            <LocationsCards data={displayData} />
          </div>
          {!searchResults && (
            <div className="locations__pagination">
              <button
                className={`locations__arrow ${
                  page <= 1 ? "locations__arrow--disabled" : ""
                }`}
                onClick={nextPage}
                disabled={page <= 1}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <div className="locations__page-info">
                {page} of {locationData ? locationData.info.pages : "0"}
              </div>
              <button
                className={`locations__arrow ${
                  locationData && page >= locationData.info.pages
                    ? "locations__arrow--disabled"
                    : ""
                }`}
                onClick={prevPage}
                disabled={locationData && page >= locationData.info.pages}
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="locations__no-results">
          <p>
            No locations found. Try a different search term or clear the search.
          </p>
        </div>
      )}
    </div>
  );
}

export default Locations;
