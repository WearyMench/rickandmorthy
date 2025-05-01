import { useState, useEffect } from "react";
import { cargarDatos } from "../Api";
import LocationsCards from "../components/LocationsCards";
import Loader from "../components/Loader";

import "../styles/LocationsPage.css";

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
    <div className="locationsContainer">
      <h1 className="locationsTitle">All Locations</h1>
      <form className="locationForm">
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Search by location ID or name"
        />
        <input type="submit" value="Search" />
      </form>
      <div className="grid">
        {locationData ? <LocationsCards data={locationData} /> : <Loader />}
      </div>
      <div className="pagination">
        <button className="arrow" onClick={nextPage} disabled={page <= 1}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="pageInfo">
          {page} of {locationData ? locationData.info.pages : "0"}
        </div>
        <button
          className="arrow"
          onClick={prevPage}
          disabled={page >= (locationData ? locationData.info.pages : 1)}
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

export default Locations;
