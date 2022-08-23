import Sidebar from "./Sidebar/Sidebar";
import "./Layout.scss";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

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