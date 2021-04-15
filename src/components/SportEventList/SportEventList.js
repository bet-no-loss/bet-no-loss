import React, { useState, useContext, useEffect } from "react";
import Web3Context from "../Web3context";

function SportEventList() {
  const web3Context = useContext(Web3Context);
  const {
    web3,
    accounts,
    contract,
    currentAccount,
    sportEvent,
    setSportEvent,
      addTestData,
  } = web3Context;

  const [sportEvents, setSportEvents] = useState([
    { teamA: "PSG", teamB: "OM", date: "23/06/2021", outComedate: "23/05/2021", id: 1 },
    { teamA: "BARCA", teamB: "LYON", date: "29/10/2021", outComedate: "29/09/2021", id: 2 },
    { teamA: "LILLE", teamB: "TOULON", date: "12/09/2021", outComedate: "12/08/2021",  id: 3 },
  ]);

const betEvent = (ev) => {
  ev.preventDefault();
  console.log("test")
}

  return (
    <div className="card text-center">
      <div className="card-header">Events List</div>
      <div className="card-body" >
        {sportEvents.map((sportev) => (
          <div key={sportev.key} style={{margin: "50px"}}>
            <h3 className="card-title">
              {sportev.teamA} <i className="far fa-futbol"/> {sportev.teamB}
            </h3>
            <p className="card-text">
              This event will take place on {sportev.date} and you can bet from {sportev.outComedate}
            </p>
            <p>Prize: $500</p>
            <button className="btn btn-primary" onClick={betEvent}>Bet</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SportEventList;
