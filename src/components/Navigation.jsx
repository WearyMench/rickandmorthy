import "../styles/nav.css";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="Nav">
      <Link to={"/"}>
        <img src={Logo} alt="logo" className="logo"></img>
      </Link>
    </div>
  );
}

export default Navigation;
