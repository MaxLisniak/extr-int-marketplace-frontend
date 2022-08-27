import "./Admin.scss";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Admin = () => {
  return (
    <div className="admin">
      <div className="error-message"></div>
      <h1>Admin page</h1>
      <ul className="tabs">
        <Link to="categories" style={{ textDecoration: "none" }}>
          <li>Categories</li>
        </Link>
        <Link to="subcategories" style={{ textDecoration: "none" }}>
          <li>Subcategories</li>
        </Link>
        <Link to="products" style={{ textDecoration: "none" }}>
          <li>Products</li>
        </Link>
      </ul>
      <Outlet />
    </div>
  )
}

export default Admin;