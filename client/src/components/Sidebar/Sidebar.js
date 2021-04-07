import React from "react";

function Sidebar() {
  return (
    <>
      <div className="">
        <p className="button is-rounded mb-4">
          <a>Dashboard</a>
        </p>
        <p className="button is-rounded">
          <a>Customers</a>
        </p>
      </div>
      <div className="m-5">
        <div
          class="card bg-dark text-white container"
          style={{ height: "160px" }}
        >
          <p class="card-text pt-5">
            Il y a actuellement $162.05 million déposé et $217,896 de
            récompenses hebdomadaire !
          </p>
          <p class="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
