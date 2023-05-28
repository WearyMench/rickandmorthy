import PropTypes from "prop-types";
import "../styles/cards.css";
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
    <div className="cardContainer">
      {data.results.map((data, idx) => (
        <div key={idx} className="card">
          <div>
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
              className="cardImage"
            />
          </div>
          <div className="cardDescription">
            <h3>{data.name}</h3>
            <h4>Dimension:</h4>
            <p>- {data.dimension}</p>
            <h4>Type:</h4>
            <p>- {data.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

LocationsCards.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LocationsCards;
