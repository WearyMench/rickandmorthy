import "../styles/header.css";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="header">
      <Navigation />
      <div className="header__content">
        <div className="header__section">
          <h1 className="header__title">Rick and Morty</h1>
          <p className="header__text">
            Rick and Morty is an animated series that follows the misadventures
            of cynical mad scientist Rick Sanchez and his good-hearted but
            fretful grandson Morty Smith. Together, they split their time
            between domestic life and interdimensional adventures that take
            place across infinite universes.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
