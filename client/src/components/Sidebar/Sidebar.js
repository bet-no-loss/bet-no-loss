import React from "react";

function Sidebar() {
  return (
    <aside className="menu column is-2 pt-4 ">
      <p className="button is-rounded mb-4">
        <a>Dashboard</a>
      </p>
      <p className="button is-rounded">
        <a>Customers</a>
      </p>
    </aside>
  );
}

export default Sidebar;
