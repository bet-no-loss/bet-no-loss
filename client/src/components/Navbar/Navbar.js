import React, { useContext } from "react";
import "../../assets/style/globalstyle.scss";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";

import Web3Context from "../Web3context";

const Navbar = () => {
  const web3Context = useContext(Web3Context);
  const { web3, accounts, contract, currentAccount } = web3Context;

  const address = currentAccount;
  const ownerAddress = "0xe087Aa17aDB5385ef7A0c9a7409689B14b4f911d";

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
                <p className="primaryColor"><strong>Bets</strong></p>
              </a>
            </li>
            <li className="nav-item pr-4">
              <a className="nav-link" href="/account">
                <p className="primaryColor"><strong>Compte</strong></p>
              </a>
            </li>
            <li className="nav-item">
              <div className="nav-link pool">
                <a href=""><span className="textPool">0 <span>ETH</span></span></a>
              </div>

            </li>
            <li className="nav-item">
              {currentAccount ? (
                  <div className="nav-link">
                    <div className="buttonAddress">
                      <span className="textAddress"><strong>{formatedAddress}</strong> </span>
                    </div>
                  </div>

              ) : (
                <button className="badge badge-warning wallet">Connect Wallet</button>
              )}
            </li>

            {/*A compléter avec Web3 pour l'admin*/}
            <li className="nav-item">
              {ownerAddress ? (
                  <a className="nav-link" href="/admin">
                    Admin
                  </a>
              ) : ''}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
