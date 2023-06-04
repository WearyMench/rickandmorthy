import { useState, useEffect } from "react";
import { cargarDatos } from "../Api";
import EpisodeCards from "../components/EpisodeCards";
import Loader from "../components/Loader";

import "../styles/CharactersPage.css";

function Episodes() {
  const [episodeData, setEpisodeData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    const data = await cargarDatos(`episode?page=${page}`);
    setEpisodeData(data);
  };

  const nextPage = () => {
    page <= 1 ? null : setPage(page - 1);
  };
  const prevPage = () => {
    page > episodeData.info.pages ? null : setPage(page + 1);
  };

  return (
    <>
      <h1 className="charactersTitle">All Episodes</h1>
      <form className="characterForm">
        <input
          type="text"
          name="episode"
          id="episode"
          placeholder=" Search by id"
        />
        <input type="submit" value="Buscar" />
      </form>
      <div className="grid">
        {episodeData ? <EpisodeCards data={episodeData} /> : <Loader />}
      </div>
      <div className="arrow-div">
        <button className="arrow" onClick={nextPage}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          {page} de {episodeData ? episodeData.info.pages : "0"}
        </div>
        <button className="arrow" onClick={prevPage}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </>
  );
}

export default Episodes;
