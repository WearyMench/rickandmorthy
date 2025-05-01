import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../styles/CharacterCards.css";

function CharacterCards({ data }) {
  return (
    <>
      {data.results.map((data, idx) => (
        <div key={idx} className="characterCard">
          <Link to={`/characters/${data.id}`} className="characterLink">
            <img src={data.image} alt={data.name} className="characterImage" />
            <div className="characterContent">
              <h3 className="characterTitle">{data.name}</h3>
              <div className="characterInfo">
                <div>
                  <span className="characterLabel">Status:</span>
                  <span
                    className={`characterValue ${data.status.toLowerCase()}`}
                  >
                    {data.status} - {data.species}
                  </span>
                </div>
                <div>
                  <span className="characterLabel">Origin:</span>
                  <span className="characterValue">{data.origin.name}</span>
                </div>
                <div>
                  <span className="characterLabel">Location:</span>
                  <span className="characterValue">{data.location.name}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

CharacterCards.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CharacterCards;
