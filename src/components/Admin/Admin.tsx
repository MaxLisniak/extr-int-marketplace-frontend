import "./Admin.scss";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import NotFound from "../NotFound/NotFound";

const Admin = () => {
  const isAdmin = useAppSelector(state => state.user.isAdmin);
  return (
    isAdmin ?
      (
        <div className="admin" >
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
        </div >
      )
      : <NotFound />

  )
}

export default Admin;