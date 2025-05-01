import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../styles/LocationCards.css";

import planet1 from "../assets/planetEarth.jpeg";
import planet2 from "../assets/planetEarth2.jpeg";
import planet3 from "../assets/planetAlien.jpeg";
import planet4 from "../assets/planetEarth3.jpeg";
const Planet = [planet1, planet2, planet3, planet4];
import Cluster from "../assets/cluster.jpeg";
import Station from "../assets/spaceStation.jpeg";
import Microuniverse from "../assets/microuniverse.webp";
import Dreamland from "../assets/dreamland.png";
import TV from "../assets/tvland.jpg";

function LocationsCards({ data }) {
  return (
    <>
      {data.results.map((data, idx) => (
        <div key={idx} className="locationCard">
          <div>
            <Link to={`/locations/${data.id}`} className="locationLink">
              <img
                src={
                  data.type === "Planet"
                    ? Planet[Math.floor(Math.random() * 4)]
                    : data.type === "Cluster"
                    ? Cluster
                    : data.type === "Space station"
                    ? Station
                    : data.type === "Microverse"
                    ? Microuniverse
                    : data.type === "TV"
                    ? TV
                    : Dreamland
                }
                alt="Location Image"
                className="locationImage"
              />
            </Link>
          </div>
          <div className="locationContent">
            <Link to={`/locations/${data.id}`} className="locationLink">
              <h3 className="locationTitle">{data.name}</h3>
            </Link>
            <div className="locationInfo">
              <h4 className="locationLabel">Dimension:</h4>
              <p className="locationValue">{data.dimension}</p>
              <h4 className="locationLabel">Type:</h4>
              <p className="locationValue">{data.type}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

LocationsCards.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LocationsCards;
