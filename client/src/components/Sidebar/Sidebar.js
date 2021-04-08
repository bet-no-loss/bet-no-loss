import React from "react";

function Sidebar() {
  return (
    <>
      <div className="m-5">
        <div
          class="card bglogo text-white container"
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
