import React from "react";
import "../../assets/style/globalstyle.scss";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

function Layout({ children }) {
  return (
    <div>
      <div>
        <Navbar />
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
