import { Link } from "react-router-dom";
import "../styles/nav.css";
import { useState, useEffect } from "react";
import Logo from "../assets/logo.png";

function Navigation() {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__content">
        <Link to="/" className="nav__logo">
          <img src={Logo} alt="Rick and Morty" className="nav__logo-img" />
        </Link>
        <div className="nav__links">
          <div className={`nav__menu ${isActive ? "nav__menu--active" : ""}`}>
            <Link to="/" className="nav__link">
              Home
            </Link>
            <Link to="/characters" className="nav__link">
              Characters
            </Link>
            <Link to="/locations" className="nav__link">
              Locations
            </Link>
            <Link to="/episodes" className="nav__link">
              Episodes
            </Link>
          </div>
          <button
            className={`nav__burger ${isActive ? "nav__burger--active" : ""}`}
            onClick={handleClick}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
