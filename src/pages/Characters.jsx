import { useState, useEffect } from "react";
import { cargarDatos } from "../Api";
import CharacterCards from "../components/CharacterCards";
import Loader from "../components/Loader";

import "../styles/CharactersPage.css";

function Characters() {
  const [characterData, setCharacterData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    const data = await cargarDatos(`character?page=${page}`);
    setCharacterData(data);
  };

  const nextPage = () => {
    page <= 1 ? null : setPage(page - 1);
  };
  const prevPage = () => {
    page > characterData.info.pages ? null : setPage(page + 1);
  };

  return (
    <>
      <h1 className="charactersTitle">All Characters</h1>
      <form className="characterForm">
        <input
          type="text"
          name="character"
          id="character"
          placeholder=" Search by name or id"
        />
        <input type="submit" value="Buscar" />
      </form>
      <div className="grid">
        {characterData ? <CharacterCards data={characterData} /> : <Loader />}
      </div>
      <div className="arrow-div">
        <button className="arrow" onClick={nextPage}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          {page} de {characterData ? characterData.info.pages : "0"}
        </div>
        <button className="arrow" onClick={prevPage}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </>
  );
}

export default Characters;
