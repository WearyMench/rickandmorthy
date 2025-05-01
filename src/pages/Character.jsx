import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/character.css";

function Character() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const EPISODES_PER_PAGE = 6;

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        // Fetch character data
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await response.json();
        setCharacter(data);

        // Fetch episodes data
        const episodePromises = data.episode.map((episodeUrl) =>
          fetch(episodeUrl).then((res) => res.json())
        );
        const episodesData = await Promise.all(episodePromises);
        setEpisodes(episodesData);
      } catch (error) {
        console.error("Error fetching character data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  const displayedEpisodes = showAllEpisodes
    ? episodes
    : episodes.slice(0, EPISODES_PER_PAGE);

  const toggleEpisodes = () => {
    setShowAllEpisodes(!showAllEpisodes);
  };

  if (loading) {
    return <Loader />;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="character-container">
      <div className="character-header">
        <Link to="/characters" className="back-button">
          ← Back to Characters
        </Link>
      </div>

      <div className="character-content">
        <div className="character-image-container">
          <img
            src={character.image}
            alt={character.name}
            className="character-image"
          />
          <div className={`status-badge ${character.status.toLowerCase()}`}>
            {character.status}
          </div>
        </div>

        <div className="character-info">
          <h1 className="character-name">{character.name}</h1>

          <div className="info-section">
            <h2>Basic Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Species:</span>
                <span className="value">{character.species}</span>
              </div>
              <div className="info-item">
                <span className="label">Gender:</span>
                <span className="value">{character.gender}</span>
              </div>
              <div className="info-item">
                <span className="label">Type:</span>
                <span className="value">{character.type || "Unknown"}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2>Location Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Origin:</span>
                <span className="value">{character.origin.name}</span>
              </div>
              <div className="info-item">
                <span className="label">Current Location:</span>
                <span className="value">{character.location.name}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2>Episodes</h2>
            <div className="episodes-list">
              {displayedEpisodes.map((episode) => (
                <Link
                  to={`/episodes/${episode.id}`}
                  key={episode.id}
                  className="episode-item"
                >
                  <span className="episode-number">
                    Episode {episode.episode}
                  </span>
                  <span className="episode-name">{episode.name}</span>
                </Link>
              ))}
            </div>
            {episodes.length > EPISODES_PER_PAGE && (
              <button className="show-more-button" onClick={toggleEpisodes}>
                {showAllEpisodes
                  ? "Show Less"
                  : `Show More (${episodes.length - EPISODES_PER_PAGE} more)`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Character;
