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
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const prevPage = () => {
    if (characterData && page < characterData.info.pages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="charactersContainer">
      <h1 className="charactersTitle">All Characters</h1>
      <form className="characterForm">
        <input
          type="text"
          name="character"
          id="character"
          placeholder="Search by name or id"
        />
        <input type="submit" value="Search" />
      </form>
      <div className="grid">
        {characterData ? <CharacterCards data={characterData} /> : <Loader />}
      </div>
      <div className="pagination">
        <button className="arrow" onClick={nextPage} disabled={page <= 1}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="pageInfo">
          {page} of {characterData ? characterData.info.pages : "0"}
        </div>
        <button
          className="arrow"
          onClick={prevPage}
          disabled={characterData && page >= characterData.info.pages}
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

export default Characters;
