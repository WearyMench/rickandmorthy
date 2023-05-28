import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import CharacterCards from "../components/CharacterCards";
import LocationsCards from "../components/LocationsCards";
import EpisodeCards from "../components/EpisodeCards";

import "../styles/home.css";

function Home() {
  const [characterData, setCharacterData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [episodeData, setEpisodeData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const cargarDatos = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character`);
      const data = await response.json();
      setCharacterData(data);
      const response2 = await fetch(`https://rickandmortyapi.com/api/location`);
      const data2 = await response2.json();
      setLocationData(data2);
      const response3 = await fetch(`https://rickandmortyapi.com/api/episode`);
      const data3 = await response3.json();
      setEpisodeData(data3);
      setLoaded(true);
    };
    cargarDatos();
  }, []);
  console.log(episodeData);
  return (
    <>
      {loaded ? (
        <>
          <div className="HeadContainer">
            <Link to={"/characters"} className="HeadText">
              <h1>Characters</h1>
              <p>Count: {characterData.info.count}</p>
              <p>Pages: {characterData.info.pages}</p>
            </Link>
          </div>
          <hr />
          <CharacterCards data={characterData} />

          <div className="HeadContainer">
            <Link to={"/locations"} className="HeadText">
              <h1>Locations</h1>
              <p>Count: {locationData.info.count}</p>
              <p>Pages: {locationData.info.pages}</p>
            </Link>
          </div>
          <hr />
          <LocationsCards data={locationData} />

          <div className="HeadContainer">
            <Link to={"/episodes"} className="HeadText">
              <h1>Episodes</h1>
              <p>Count: {episodeData.info.count}</p>
              <p>Pages: {episodeData.info.pages}</p>
            </Link>
          </div>
          <hr />
          <EpisodeCards data={episodeData} />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Home;
