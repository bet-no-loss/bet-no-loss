import React, { useContext } from "react";

import Web3Context from "../Web3context";

const Navbar = () => {
  const web3Context = useContext(Web3Context);
  const { web3, accounts, contract, currentAccount } = web3Context;

  const address = currentAccount;

  const first = address.slice(0, 5);
  const second = address.slice(38, 42);
  const formatedAddress = `${first}...${second}`;

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <p className="control">
            {currentAccount ?
            <button className="button is-rounded">{formatedAddress}</button> :
            <button className="button is-rounded">Connect Wallet</button>
            }
            
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
