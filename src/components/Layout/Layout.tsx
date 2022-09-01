import "./Layout.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import SearchResults from "./Navbar/SearchResults/SearchResults";

const Layout = () => {

  return (
    <>
      <div className="layout">
        <Navbar />
        <Sidebar />
        <div className="content">
          <SearchResults />
          <Outlet />
        </div>

      </div>
    </>
  )
}

export default Layout;