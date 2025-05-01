import PropTypes from "prop-types";
import "../styles/EpisodeCards.css";

import Images from "../assets/rickandmorty.jpeg";
import Images2 from "../assets/rickasset.jpeg";
import Images3 from "../assets/morty.jpeg";

function EpisodeCards({ data }) {
  const Picture = [Images, Images2, Images3];
  return (
    <>
      {data.results.map(({ id, name, episode, air_date }) => (
        <div key={id} className="episodeCard">
          <div>
            <a
              href="https://www.hulu.com/series/rick-and-morty-d76d6361-3fbf-4842-8dd7-e05520557280"
              target="_blank"
              rel="noopener noreferrer"
              className="episodeLink"
            >
              <img
                src={Picture[Math.floor(Math.random() * Picture.length)]}
                alt={episode}
                className="episodeImage"
              />
            </a>
          </div>
          <div className="episodeContent">
            <a
              href="https://www.hulu.com/series/rick-and-morty-d76d6361-3fbf-4842-8dd7-e05520557280"
              target="_blank"
              rel="noopener noreferrer"
              className="episodeLink"
            >
              <h3 className="episodeTitle">{name}</h3>
            </a>
            <div className="episodeInfo">
              <h4 className="episodeLabel">Episode:</h4>
              <p className="episodeValue">{episode}</p>
              <h4 className="episodeLabel">Air Date:</h4>
              <p className="episodeValue">{air_date}</p>
            </div>
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
