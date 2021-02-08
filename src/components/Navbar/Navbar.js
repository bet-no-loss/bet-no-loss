import React, { useState, useContext, useEffect } from "react";
import Web3Context from "../Web3context";
import logo from "../../logo200x200.png";

function Navbar() {
  const style = {
    padding: "10px",
  };

  const web3Context = useContext(Web3Context);
  const { web3, accounts, contract, currentAccount } = web3Context;

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark shadow mb-5">
        <p className="navbar-brand my-auto" style={style}>
          Bet-No-Loss&nbsp;
          <img src={logo} style={{ width: "50px", marginBottom: "10px" }} />
        </p>
        <ul className="navbar-nav">
          <li className="nav-item text-white" style={style}>
            {" "}
            {currentAccount}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
