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
    setSportEvent
  } = web3Context;

  console.log("Sport Events", sportEvent)

  return (
    <div className="card text-center">
      <div className="card-header">Events List</div>
      <div className="card-body">
        <h5 className="card-title">{sportEvent.teamA} VS {sportEvent.teamB}</h5>
        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <p>Prize: $500</p>
        <button className="btn btn-primary">
            Bet
        </button>
        
      </div>
    </div>
  );
}

export default SportEventList;
