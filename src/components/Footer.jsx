import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3 className="footer__title">About</h3>
          <p className="footer__text">
            This is a fan-made website showcasing the characters, locations, and
            episodes from the Rick and Morty universe.
          </p>
        </div>
        <div className="footer__section">
          <h3 className="footer__title">Links</h3>
          <ul className="footer__links">
            <li>
              <a
                href="https://www.hulu.com/series/rick-and-morty-d76d6361-3fbf-4842-8dd7-e05520557280"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on Hulu
              </a>
            </li>
            <li>
              <a
                href="https://www.adultswim.com/videos/rick-and-morty"
                target="_blank"
                rel="noopener noreferrer"
              >
                Adult Swim
              </a>
            </li>
            <li>
              <a
                href="https://rickandmortyapi.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Source
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h3 className="footer__title">Quick Links</h3>
          <ul className="footer__links">
            <li>
              <a href="/characters">Characters</a>
            </li>
            <li>
              <a href="/locations">Locations</a>
            </li>
            <li>
              <a href="/episodes">Episodes</a>
            </li>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Rick and Morty Fan Site. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
