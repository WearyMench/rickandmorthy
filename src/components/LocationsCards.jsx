import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../styles/LocationCards.css";

function LocationsCards({ data }) {
  return (
    <>
      {data.results.map((location) => (
        <div key={location.id} className="locationCard">
          <Link to={`/locations/${location.id}`} className="locationLink">
            <div className="locationContent">
              <h3 className="locationTitle">{location.name}</h3>
              <div className="locationInfo">
                <div>
                  <span className="locationLabel">Type:</span>
                  <span className="locationValue">{location.type}</span>
                </div>
                <div>
                  <span className="locationLabel">Dimension:</span>
                  <span className="locationValue">{location.dimension}</span>
                </div>
                <div>
                  <span className="locationLabel">Residents:</span>
                  <span className="locationValue">
                    {location.residents.length}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

LocationsCards.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LocationsCards;
