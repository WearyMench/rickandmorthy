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
      const response = await fetch(`https://rickandmortyapi.com/api/character`);
      const data = await response.json();
      setCharacterData(data);
      const response2 = await fetch(`https://rickandmortyapi.com/api/location`);
      const data2 = await response2.json();
      setLocationData(data2);
      const response3 = await fetch(`https://rickandmortyapi.com/api/episode`);
      const data3 = await response3.json();
      setEpisodeData(data3);
    };
    cargarDatos();
  }, []);

  return (
    <>
      <div className="HeadContainer">
        <Link to={"/characters"} className="HeadText">
          <h1>Characters</h1>
          <p>Count: {characterData ? characterData.info.count : "0"}</p>
          <p>Pages: {characterData ? characterData.info.pages : "0"}</p>
        </Link>
      </div>
      <hr />
      <div className="cardContainer">
        {characterData ? <CharacterCards data={characterData} /> : <Loader />}
      </div>

      <div className="HeadContainer">
        <Link to={"/locations"} className="HeadText">
          <h1>Locations</h1>
          <p>Count: {locationData ? locationData.info.count : "0"}</p>
          <p>Pages: {locationData ? locationData.info.pages : "0"}</p>
        </Link>
      </div>
      <hr />
      <div className="cardContainer">
        {locationData ? <LocationsCards data={locationData} /> : <Loader />}
      </div>

      <div className="HeadContainer">
        <Link to={"/episodes"} className="HeadText">
          <h1>Episodes</h1>
          <p>Count: {episodeData ? episodeData.info.count : "0"}</p>
          <p>Pages: {episodeData ? episodeData.info.pages : "0"}</p>
        </Link>
      </div>
      <hr />
      <div className="cardContainer">
        {episodeData ? <EpisodeCards data={episodeData} /> : <Loader />}
      </div>
    </>
  );
}

export default Home;
