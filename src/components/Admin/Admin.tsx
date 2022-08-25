import "./Admin.scss";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {

  return (
    <div className="admin">
      <h1>Admin page</h1>
      <ul className="tabs">
        <Link to="products" style={{ textDecoration: "none" }}>
          <li>Products</li>
        </Link>
        <Link to="categories" style={{ textDecoration: "none" }}>
          <li>Categories</li>
        </Link>
        <Link to="subcategories" style={{ textDecoration: "none" }}>
          <li>Subcategories</li>
        </Link>
        <Link to="characteristics" style={{ textDecoration: "none" }}>
          <li>Characteristics</li>
        </Link>
      </ul>
      <Outlet />
    </div>
  )
}

export default Admin;