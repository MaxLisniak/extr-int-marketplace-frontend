import "./Layout.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

const Layout = (props: any) => {

  return (
    <div className="layout">
      <Navbar />
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>

    </div>
  )
}

export default Layout;