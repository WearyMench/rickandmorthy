import { useState, useEffect } from "react";
import { cargarDatos } from "../Api";
import EpisodeCards from "../components/EpisodeCards";
import Loader from "../components/Loader";

import "../styles/EpisodesPage.css";

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
    <div className="episodesContainer">
      <h1 className="episodesTitle">All Episodes</h1>
      <form className="episodeForm">
        <input
          type="text"
          name="episode"
          id="episode"
          placeholder="Search by episode ID or name"
        />
        <input type="submit" value="Search" />
      </form>
      <div className="grid">
        {episodeData ? <EpisodeCards data={episodeData} /> : <Loader />}
      </div>
      <div className="pagination">
        <button className="arrow" onClick={nextPage} disabled={page <= 1}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="pageInfo">
          {page} of {episodeData ? episodeData.info.pages : "0"}
        </div>
        <button
          className="arrow"
          onClick={prevPage}
          disabled={page >= (episodeData ? episodeData.info.pages : 1)}
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

export default Episodes;
