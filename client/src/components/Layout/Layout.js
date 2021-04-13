import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

function Layout({ children }) {
  return (
    <div>
      <div>
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
