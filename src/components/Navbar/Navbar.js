import React, { useContext } from "react";
import "../../assets/style/globalstyle.scss";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { Jazzicon } from "@ukstv/jazzicon-react";

import Web3Context from "../Web3context";

const Navbar = () => {
  const web3Context = useContext(Web3Context);
  const { web3, accounts, contract, currentAccount } = web3Context;

  const address = currentAccount;
  const wallet = web3.eth.getAccounts();

  const ownerAddress = '0xe087aa17adb5385ef7a0c9a7409689b14b4f911d';

  console.log('web3',web3);
  console.log('accounts', accounts);
  console.log('contract', contract);
  console.log('current', currentAccount);
  console.log('owner', ownerAddress);

  const first = address.slice(0, 5);
  const second = address.slice(38, 42);
  const formatedAddress = `${first}...${second}`;



  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white shadow">
      <div className="container">
        <Link className="navbar-brand p-0" to="/">
          <img src={logo} alt="logo" width="80" className="logo" />
        </Link>

        <div>
          <ul className="navbar-nav ml-auto d-flex align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <span className="primaryColor"><strong>Bets</strong></span>
              </a>
            </li>
            <li className="nav-item pr-4">
              <a className="nav-link" href="/account">
                <span className="primaryColor"><strong>Compte</strong></span>
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
                      <span className="jazzicon">
                        <Jazzicon address={currentAccount}/>
                      </span>
                      <span className="textAddress"><strong>{formatedAddress}</strong> </span>
                    </div>
                  </div>

              ) : (
                <button className="badge badge-warning wallet" onClick={()=> wallet}>Connect Wallet</button>
              )}
            </li>

            {/*A compléter avec Web3 pour l'admin*/}
            <li className="nav-item">
              {ownerAddress === currentAccount && (
                  <a className="nav-link" href="/admin">
                    <strong style={{color: 'red', border: '1px solid red', padding: '5px'}}>Admin</strong>
                  </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
