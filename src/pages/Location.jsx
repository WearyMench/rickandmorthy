import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/location.css";

function Location() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllResidents, setShowAllResidents] = useState(false);
  const RESIDENTS_PER_PAGE = 6;

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        // Fetch location data
        const response = await fetch(
          `https://rickandmortyapi.com/api/location/${id}`
        );
        const data = await response.json();
        setLocation(data);

        // Fetch residents data
        if (data.residents.length > 0) {
          const residentPromises = data.residents.map((residentUrl) =>
            fetch(residentUrl).then((res) => res.json())
          );
          const residentsData = await Promise.all(residentPromises);
          setResidents(residentsData);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  const displayedResidents = showAllResidents
    ? residents
    : residents.slice(0, RESIDENTS_PER_PAGE);

  const toggleResidents = () => {
    setShowAllResidents(!showAllResidents);
  };

  if (loading) {
    return <Loader />;
  }

  if (!location) {
    return <div>Location not found</div>;
  }

  return (
    <div className="location-container">
      <div className="location-header">
        <Link to="/locations" className="back-button">
          ← Back to Locations
        </Link>
      </div>

      <div className="location-content">
        <div className="location-info">
          <h1 className="location-name">{location.name}</h1>

          <div className="info-section">
            <h2>Location Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Type:</span>
                <span className="value">{location.type || "Unknown"}</span>
              </div>
              <div className="info-item">
                <span className="label">Dimension:</span>
                <span className="value">{location.dimension || "Unknown"}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2>Residents</h2>
            {residents.length > 0 ? (
              <>
                <div className="residents-list">
                  {displayedResidents.map((resident) => (
                    <Link
                      to={`/characters/${resident.id}`}
                      key={resident.id}
                      className="resident-item"
                    >
                      <img
                        src={resident.image}
                        alt={resident.name}
                        className="resident-image"
                      />
                      <div className="resident-info">
                        <span className="resident-name">{resident.name}</span>
                        <span
                          className={`resident-status ${resident.status.toLowerCase()}`}
                        >
                          {resident.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                {residents.length > RESIDENTS_PER_PAGE && (
                  <button
                    className="show-more-button"
                    onClick={toggleResidents}
                  >
                    {showAllResidents
                      ? "Show Less"
                      : `Show More (${
                          residents.length - RESIDENTS_PER_PAGE
                        } more)`}
                  </button>
                )}
              </>
            ) : (
              <p className="no-residents">
                No residents found in this location.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
