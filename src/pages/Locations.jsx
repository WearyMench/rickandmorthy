import { useState, useEffect } from "react";
import { cargarDatos } from "../Api";
import LocationsCards from "../components/LocationsCards";
import Loader from "../components/Loader";

import "../styles/CharactersPage.css";

function Locations() {
  const [locationData, setLocationData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    const data = await cargarDatos(`location?page=${page}`);
    setLocationData(data);
  };

  const nextPage = () => {
    page <= 1 ? null : setPage(page - 1);
  };
  const prevPage = () => {
    page > locationData.info.pages ? null : setPage(page + 1);
  };

  return (
    <>
      <h1 className="charactersTitle">All Locations</h1>
      <form className="characterForm">
        <input
          type="text"
          name="location"
          id="location"
          placeholder=" Search by id"
        />
        <input type="submit" value="Buscar" />
      </form>
      <div className="grid">
        {locationData ? <LocationsCards data={locationData} /> : <Loader />}
      </div>
      <div className="arrow-div">
        <button className="arrow" onClick={nextPage}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          {page} de {locationData ? locationData.info.pages : "0"}
        </div>
        <button className="arrow" onClick={prevPage}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </>
  );
}

export default Locations;
