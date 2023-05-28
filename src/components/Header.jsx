import "../styles/header.css";
import Navigation from "./Navigation";

function Header() {
  return (
    <div className="header">
      <Navigation />
      <div className="text_container">
        <h1 className="title">Rick and Morty</h1>
        <p>
          Rick and Morty is a show about a sociopathic scientist who drags his
          unintelligent grandson on insanely dangerous adventures across the
          universe. Created and executive produced by Dan Harmon (Community,
          Channel 101) and Justin Roiland (House of Cosbys).
        </p>
      </div>
    </div>
  );
}

export default Header;
