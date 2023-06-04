import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../styles/cards.css";

function CharacterCards({ data }) {
  return (
    <>
      {data.results.map((data, idx) => (
        <div key={idx} className="card">
          <div>
            <Link to={`/characters/${data.id}`}>
              <img src={data.image} alt={data.name} className="cardImage" />
            </Link>
          </div>
          <div className="cardDescription">
            <Link to={`/characters/${data.id}`}>
              <h3>{data.name}</h3>
            </Link>
            <p>
              {data.status === "Alive"
                ? "🟢"
                : data.status === "unknown"
                ? "🟠"
                : "🔴"}{" "}
              {data.status} - {data.species}
            </p>
            <h4>Origin:</h4>
            <p>- {data.origin.name}</p>
            <h4>Actual Location:</h4>
            <p>- {data.location.name}</p>
          </div>
        </div>
      ))}
    </>
  );
}

CharacterCards.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CharacterCards;
