import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { Jazzicon } from "@ukstv/jazzicon-react";

class Navbar extends Component {

  render() {
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
                  {this.props.account ? (
                      <div className="nav-link">
                        <div className="buttonAddress">
                      <span className="jazzicon">
                        <Jazzicon address={this.props.account}/>
                      </span>
                          <span className="textAddress">
                            <small id="account">
                              <a target="_blank"
                                 alt=""
                                 className="text-white"
                                 rel="noopener noreferrer"
                                 href={"https://etherscan.io/address/" + this.props.account}>
                                {this.props.account.substring(0,6)}...{this.props.account.substring(38,42)}
                              </a>
                            </small>
                          </span>
                        </div>
                      </div>

                  ) : (
                      <div className="badge badge-warning wallet" >Connect Wallet</div>
                  )}
                </li>

                {/*A compléter avec Web3 pour l'admin*/}
                {/*<li className="nav-item">*/}
                {/*  {this.state.ownerAddress === this.state.currentAccount && (*/}
                {/*      <div className="nav-link">*/}
                {/*        <span className="btn btn-outline-danger"><strong>Admin</strong></span>*/}
                {/*      </div>*/}
                {/*  )}*/}
                {/*</li>*/}
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}

export default Navbar;
