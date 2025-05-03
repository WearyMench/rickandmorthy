import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchData } from "../Api";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";
import "../styles/LocationPage.css";

function Location() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllResidents, setShowAllResidents] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchData(`location/${id}`);
        setLocation(data);

        // Fetch residents
        const residentPromises = data.residents.map((residentUrl) => {
          const residentId = residentUrl.split("/").pop();
          return fetchData(`character/${residentId}`);
        });
        const residentData = await Promise.all(residentPromises);
        setResidents(residentData);
      } catch (error) {
        setError(error);
        console.error("Error loading location:", error);
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, [id]);

  const toggleResidents = () => {
    setShowAllResidents(!showAllResidents);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorDisplay error={error} resourceType="location" resourceId={id} />
    );
  }

  const displayedResidents = showAllResidents
    ? residents
    : residents.slice(0, 5);

  return (
    <div className="location-detail">
      <div className="location-detail__header">
        <Link to="/locations" className="location-detail__back-button">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Locations
        </Link>
        <h1 className="location-detail__title">{location.name}</h1>
      </div>

      <div className="location-detail__content">
        <div className="location-detail__info">
          <div className="location-detail__details">
            <div className="location-detail__detail-item">
              <span className="location-detail__label">Type:</span>
              <span className="location-detail__value">{location.type}</span>
            </div>
            <div className="location-detail__detail-item">
              <span className="location-detail__label">Dimension:</span>
              <span className="location-detail__value">
                {location.dimension}
              </span>
            </div>
            <div className="location-detail__detail-item">
              <span className="location-detail__label">Residents:</span>
              <span className="location-detail__value">{residents.length}</span>
            </div>
          </div>
        </div>

        <div className="location-detail__residents">
          <h2 className="location-detail__residents-title">Residents</h2>
          <div className="location-detail__residents-list">
            {displayedResidents.map((resident) => (
              <Link
                to={`/characters/${resident.id}`}
                key={resident.id}
                className="location-detail__resident-card"
              >
                <img
                  src={resident.image}
                  alt={resident.name}
                  className="location-detail__resident-image"
                />
                <div className="location-detail__resident-info">
                  <h3 className="location-detail__resident-name">
                    {resident.name}
                  </h3>
                  <div className="location-detail__resident-details">
                    <span
                      className={`location-detail__resident-status location-detail__resident-status--${resident.status.toLowerCase()}`}
                    >
                      {resident.status}
                    </span>
                    <span className="location-detail__resident-species">
                      {resident.species}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {residents.length > 5 && (
            <button
              onClick={toggleResidents}
              className="location-detail__show-more"
            >
              {showAllResidents ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Location;
