import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchData } from "../Api";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";
import "../styles/CharacterPage.css";

function Character() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchData(`character/${id}`);
        setCharacter(data);

        // Fetch episodes
        const episodePromises = data.episode.map((episodeUrl) => {
          const episodeId = episodeUrl.split("/").pop();
          return fetchData(`episode/${episodeId}`);
        });
        const episodeData = await Promise.all(episodePromises);
        setEpisodes(episodeData);
      } catch (error) {
        setError(error);
        console.error("Error loading character:", error);
      } finally {
        setLoading(false);
      }
    };

    getCharacter();
  }, [id]);

  const toggleEpisodes = () => {
    setShowAllEpisodes(!showAllEpisodes);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorDisplay error={error} resourceType="character" resourceId={id} />
    );
  }

  const displayedEpisodes = showAllEpisodes ? episodes : episodes.slice(0, 5);

  return (
    <div className="character-detail">
      <div className="character-detail__header">
        <Link to="/characters" className="character-detail__back-button">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Characters
        </Link>
        <h1 className="character-detail__title">{character.name}</h1>
      </div>

      <div className="character-detail__content">
        <div className="character-detail__info">
          <div className="character-detail__image-container">
            <img
              src={character.image}
              alt={character.name}
              className="character-detail__image"
            />
            <div
              className={`character-detail__status character-detail__status--${character.status.toLowerCase()}`}
            >
              {character.status}
            </div>
          </div>

          <div className="character-detail__details">
            <div className="character-detail__detail-item">
              <span className="character-detail__label">Species:</span>
              <span className="character-detail__value">
                {character.species}
              </span>
            </div>
            <div className="character-detail__detail-item">
              <span className="character-detail__label">Gender:</span>
              <span className="character-detail__value">
                {character.gender}
              </span>
            </div>
            <div className="character-detail__detail-item">
              <span className="character-detail__label">Origin:</span>
              <span className="character-detail__value">
                {character.origin.name}
              </span>
            </div>
            <div className="character-detail__detail-item">
              <span className="character-detail__label">Location:</span>
              <span className="character-detail__value">
                {character.location.name}
              </span>
            </div>
          </div>
        </div>

        <div className="character-detail__episodes">
          <h2 className="character-detail__episodes-title">Episodes</h2>
          <div className="character-detail__episodes-list">
            {displayedEpisodes.map((episode) => (
              <div key={episode.id} className="character-detail__episode-card">
                <h3 className="character-detail__episode-name">
                  {episode.name}
                </h3>
                <div className="character-detail__episode-details">
                  <span className="character-detail__episode-number">
                    Episode {episode.episode}
                  </span>
                  <span className="character-detail__episode-date">
                    {episode.air_date}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {episodes.length > 5 && (
            <button
              onClick={toggleEpisodes}
              className="character-detail__show-more"
            >
              {showAllEpisodes ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Character;
