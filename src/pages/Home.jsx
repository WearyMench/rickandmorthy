import "../styles/HomePage.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <section className="home__section">
        <h2 className="home__title">Welcome to the Multiverse</h2>
        <p className="home__subtitle">
          Explore the infinite dimensions of Rick and Morty&apos;s universe.
          Discover unique characters, bizarre locations, and mind-bending
          episodes that will take you on an interdimensional journey.
        </p>
        <div className="home__grid">
          <div className="home__card">
            <img
              src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
              alt="Characters"
              className="home__card-image"
            />
            <div className="home__card-content">
              <h3 className="home__card-title">Characters</h3>
              <p className="home__card-text">
                Meet the diverse cast of characters from across the multiverse,
                from the brilliant but cynical Rick to the kind-hearted Morty.
              </p>
              <Link to="/characters" className="home__card-link">
                Explore Characters →
              </Link>
            </div>
          </div>
          <div className="home__card">
            <img
              src="https://rickandmortyapi.com/api/character/avatar/3.jpeg"
              alt="Locations"
              className="home__card-image"
            />
            <div className="home__card-content">
              <h3 className="home__card-title">Locations</h3>
              <p className="home__card-text">
                Visit the most bizarre and fascinating locations across infinite
                dimensions, from the Citadel of Ricks to the Cronenberg World.
              </p>
              <Link to="/locations" className="home__card-link">
                Explore Locations →
              </Link>
            </div>
          </div>
          <div className="home__card">
            <img
              src="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
              alt="Episodes"
              className="home__card-image"
            />
            <div className="home__card-content">
              <h3 className="home__card-title">Episodes</h3>
              <p className="home__card-text">
                Relive the most memorable adventures and misadventures of Rick
                and Morty, from interdimensional cable to the Meeseeks.
              </p>
              <Link to="/episodes" className="home__card-link">
                Explore Episodes →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
