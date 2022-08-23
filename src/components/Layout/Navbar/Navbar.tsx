import "./Navbar.scss";
import Logo from "./assets/logo.png";

const Navbar = () => {

  return (<nav className="navbar">
    <img className="logo" src={Logo} alt="Brand logo" />
  </nav>)
}

export default Navbar;