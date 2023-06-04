import { Link } from "react-router-dom";
import "../styles/nav.css";
import { useState } from "react";
import Logo from "../assets/logo.png";
// import BurgerMenu from "../assets/barra-de-menus.png";

function Navigation() {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="Nav">
      <Link to={"/"}>
        <img src={Logo} alt="logo" className="logo"></img>
      </Link>
      <div className="NavLinks">
        <div className={`menu-links ${isActive ? "active" : ""}`}>
          <Link to={"/"}>Home</Link>
          <Link to={"/characters"}>Characters</Link>
          <Link to={"/locations"}>Locations</Link>
          <Link to={"/episodes"}>Episodes</Link>
        </div>
        <button
          className={`burger-menu ${isActive ? "change" : ""}`}
          onClick={handleClick}
        >
          <div></div>
          <div></div>
          <div></div>
          {/* <img src={BurgerMenu} alt="Menu" className="logo" /> */}
        </button>
      </div>
    </div>
  );
}

export default Navigation;
