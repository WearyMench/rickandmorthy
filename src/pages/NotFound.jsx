import { Link } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404 - Lost in the Multiverse</h1>
      <p className="not-found__message">
        Oops! Looks like you&apos;ve stumbled into the wrong dimension.
        Don&apos;t worry, even Rick makes mistakes sometimes. Let&apos;s get you
        back to a familiar reality.
      </p>
      <Link to="/" className="not-found__link">
        Return to Home Dimension
      </Link>
    </div>
  );
};

export default NotFound;
