import PropTypes from "prop-types";
import "../styles/EpisodesCards.css";

function EpisodesCards({ data }) {
  return (
    <>
      {data.results.map((episode) => (
        <div key={episode.id} className="episodeCard">
          <a
            href="https://www.hulu.com/series/rick-and-morty-d76d6361-3fbf-4842-8dd7-e05520557280"
            target="_blank"
            rel="noopener noreferrer"
            className="episodeLink"
          >
            <div className="episodeContent">
              <h3 className="episodeTitle">{episode.name}</h3>
              <div className="episodeInfo">
                <div>
                  <span className="episodeLabel">Episode:</span>
                  <span className="episodeValue">{episode.episode}</span>
                </div>
                <div>
                  <span className="episodeLabel">Air Date:</span>
                  <span className="episodeValue">{episode.air_date}</span>
                </div>
                <div>
                  <span className="episodeLabel">Characters:</span>
                  <span className="episodeValue">
                    {episode.characters.length}
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  );
}

EpisodesCards.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EpisodesCards;
