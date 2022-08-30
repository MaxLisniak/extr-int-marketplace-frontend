import "./Sidebar.scss";
import { Link } from "react-router-dom";
import HomeIcon from "./assets/home.png";
import CategoryIcon from "./assets/category.png";
import StarIcon from "./assets/star.png";
import AdminIcon from "./assets/admin.png";
import { useAppSelector } from "../../../app/hooks";

const Sidebar = () => {

  const categories = useAppSelector(state => state.filter.categories);

  return (
    <div className="sidebar">
      <div className="item">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={HomeIcon} alt="Home" />
          <p className="link-label">Home</p>
        </Link>
      </div>
      <div className="item">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={StarIcon} alt="Favorites" />
          <p className="link-label">Favorites</p>
        </Link>
      </div>
      <div className="item">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={CategoryIcon} alt="Categories" />
          <p className="link-label">Categories</p>
        </Link>
        <ul className="subcategories-list">
          {categories.map(category => {
            return <Link
              to={`explore/${category.name}`}
              style={{ textDecoration: "none" }}
              key={category.id}
            >
              <li key={category.id}>{category.name}</li>
            </Link>

          })}
        </ul>
      </div>
      <div className="item">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <img src={AdminIcon} alt="Admin" />
          <p className="link-label">Admin</p>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar;