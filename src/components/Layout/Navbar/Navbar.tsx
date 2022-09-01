import "./Navbar.scss";
import Logo from "./assets/logo.png";
import Searchbar from "./Searchbar/Searchbar";
import User from "./User/User";

const Navbar = () => {


  return (<nav className="navbar">
    <img className="logo" src={Logo} alt="Brand logo" />
    <Searchbar />
    <User />
  </nav>)
}

export default Navbar;