import PropTypes from "prop-types";
import "../styles/cards.css";

import Images from "../assets/rickandmorty.jpeg";
import Images2 from "../assets/rickasset.jpeg";
import Images3 from "../assets/morty.jpeg";

function EpisodeCards({ data }) {
  const Picture = [Images, Images2, Images3];
  return (
    <>
      {data.results.map(({ id, name, episode, air_date }) => (
        <div key={id} className="card">
          <div>
            <a
              href="https://www.hulu.com/series/rick-and-morty-d76d6361-3fbf-4842-8dd7-e05520557280"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Picture[Math.floor(Math.random() * Picture.length)]}
                alt={episode}
                className="cardImage"
              />
            </a>
          </div>
          <div className="cardDescription">
            <a
              href="https://www.hulu.com/series/rick-and-morty-d76d6361-3fbf-4842-8dd7-e05520557280"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{name}</h3>
            </a>
            <h4>Episode:</h4>
            <p>- {episode}</p>
            <h4>Air Date:</h4>
            <p>- {air_date}</p>
          </div>
        </div>
      ))}
    </>
  );
}

EpisodeCards.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EpisodeCards;
