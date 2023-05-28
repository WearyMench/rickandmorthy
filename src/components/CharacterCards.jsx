import PropTypes from "prop-types";
import "../styles/cards.css";

function CharacterCards({ data }) {
  return (
    <div className="cardContainer">
      {data.results.map((data, idx) => (
        <div key={idx} className="card">
          <div>
            <img src={data.image} alt={data.name} className="cardImage" />
          </div>
          <div className="cardDescription">
            <h3>{data.name}</h3>
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
    </div>
  );
}

CharacterCards.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CharacterCards;
