import "./Sidebar.scss";
import { Link } from "react-router-dom";
import HomeIcon from "./assets/home.png";
import CategoryIcon from "./assets/category.png";
import StarIcon from "./assets/star.png";

const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="item">
        <Link to="/"><img src={HomeIcon} alt="Home" /></Link>
      </div>
      <div className="item"><img src={StarIcon} alt="Favorites" /></div>
      <div className="item"><img src={CategoryIcon} alt="Categories" /></div>
    </div>
  )
}

export default Sidebar;