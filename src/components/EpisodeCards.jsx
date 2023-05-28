import PropTypes from "prop-types";
import "../styles/cards.css";

import Images from "../assets/rickandmorty.jpeg";
import Images2 from "../assets/rickasset.jpeg";
import Images3 from "../assets/morty.jpeg";

function EpisodeCards({ data }) {
  const Picture = [Images, Images2, Images3];
  return (
    <div className="cardContainer">
      {data.results.map(({ id, name, episode, air_date }) => (
        <div key={id} className="card">
          <div>
            <img
              src={Picture[Math.floor(Math.random() * Picture.length)]}
              alt={episode}
              className="cardImage"
            />
          </div>
          <div className="cardDescription">
            <h3>{name}</h3>
            <h4>Episode:</h4>
            <p>- {episode}</p>
            <h4>Air Date:</h4>
            <p>- {air_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

EpisodeCards.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EpisodeCards;
