import "./Navbar.scss";
import Logo from "./assets/logo.png";
import Searchbar from "./Searchbar/Searchbar";

const Navbar = () => {


  return (<nav className="navbar">
    <img className="logo" src={Logo} alt="Brand logo" />
    <Searchbar />
    <span>user</span>
  </nav>)
}

export default Navbar;