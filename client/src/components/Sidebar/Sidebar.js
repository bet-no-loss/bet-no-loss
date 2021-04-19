import React from "react";

function Sidebar() {
  return (
    <>
      <div className="m-5">
        <div
          className="bglogo text-white container "
          style={{ height: "160px" }}
        >
          <h3 className="card-text pt-5 display-5"><strong>
            Il y a actuellement $162.05 million déposé et $217,896 de
            récompenses hebdomadaire !</strong>
          </h3>
          <p className="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
