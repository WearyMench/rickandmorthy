import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import CharacterCards from "../components/CharacterCards";
import LocationsCards from "../components/LocationsCards";
import EpisodeCards from "../components/EpisodeCards";

import "../styles/home.css";

function Home() {
  const [characterData, setCharacterData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [episodeData, setEpisodeData] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=1`
      );
      const data = await response.json();
      // Take only first 4 characters
      setCharacterData({ ...data, results: data.results.slice(0, 4) });

      const response2 = await fetch(
        `https://rickandmortyapi.com/api/location?page=1`
      );
      const data2 = await response2.json();
      // Take only first 4 locations
      setLocationData({ ...data2, results: data2.results.slice(0, 4) });

      const response3 = await fetch(
        `https://rickandmortyapi.com/api/episode?page=1`
      );
      const data3 = await response3.json();
      // Take only first 4 episodes
      setEpisodeData({ ...data3, results: data3.results.slice(0, 4) });
    };
    cargarDatos();
  }, []);

  return (
    <div className="homeContainer">
      <section className="sectionContainer">
        <div className="sectionHeader">
          <Link to={"/characters"} className="sectionLink">
            <h1 className="sectionTitle">Characters</h1>
            <div className="sectionInfo">
              <p>Count: {characterData ? characterData.info.count : "0"}</p>
              <p>Pages: {characterData ? characterData.info.pages : "0"}</p>
            </div>
          </Link>
        </div>
        <div className="grid">
          {characterData ? <CharacterCards data={characterData} /> : <Loader />}
        </div>
      </section>

      <section className="sectionContainer">
        <div className="sectionHeader">
          <Link to={"/locations"} className="sectionLink">
            <h1 className="sectionTitle">Locations</h1>
            <div className="sectionInfo">
              <p>Count: {locationData ? locationData.info.count : "0"}</p>
              <p>Pages: {locationData ? locationData.info.pages : "0"}</p>
            </div>
          </Link>
        </div>
        <div className="grid">
          {locationData ? <LocationsCards data={locationData} /> : <Loader />}
        </div>
      </section>

      <section className="sectionContainer">
        <div className="sectionHeader">
          <Link to={"/episodes"} className="sectionLink">
            <h1 className="sectionTitle">Episodes</h1>
            <div className="sectionInfo">
              <p>Count: {episodeData ? episodeData.info.count : "0"}</p>
              <p>Pages: {episodeData ? episodeData.info.pages : "0"}</p>
            </div>
          </Link>
        </div>
        <div className="grid">
          {episodeData ? <EpisodeCards data={episodeData} /> : <Loader />}
        </div>
      </section>
    </div>
  );
}

export default Home;
