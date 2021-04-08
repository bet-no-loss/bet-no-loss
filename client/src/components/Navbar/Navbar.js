import React, { useContext } from "react";
import "../../assets/style/globalstyle.scss";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";

import Web3Context from "../Web3context";

const Navbar = () => {
  const web3Context = useContext(Web3Context);
  const { web3, accounts, contract, currentAccount } = web3Context;

  const address = currentAccount;

  const first = address.slice(0, 5);
  const second = address.slice(38, 42);
  const formatedAddress = `${first}...${second}`;

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white shadow">
      <div className="container">
        <Link className="navbar-brand p-0" to="/">
          <img src={logo} alt="logo" width="80" className="logo" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Customers
              </a>
            </li>
            <li className="nav-item">
              {currentAccount ? (
                <button className="badge badge-warning">
                  {formatedAddress}
                </button>
              ) : (
                <button className="badge badge-warning">Connect Wallet</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
