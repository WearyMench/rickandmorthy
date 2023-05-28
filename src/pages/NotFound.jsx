import "../styles/notFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="Not_Found">
      <h1>Not Found</h1>
      <Link to={"/"} className="backButton">
        Volver a Inicio
      </Link>
    </div>
  );
}

export default NotFound;
