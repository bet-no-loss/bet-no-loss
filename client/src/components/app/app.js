import Play from "../../contracts/Play.json";
import DAI from "../../contracts/DAI.json";
import React, {Component} from "react";
import Navbar from "../Navbar/Navbar";
import Main from "./main";
import Web3 from "web3";
import "./app.css";
import Footer from "../Footer/Footer";
import {Link} from "react-router-dom";
import logo from "../../logo.svg";
import {Jazzicon} from "@ukstv/jazzicon-react";
import Home from "../app/Home/home";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
}); // leaving out the arguments will default to these values

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: undefined,
            currentAccount: undefined,
            adminAddress: "0xCcabbBE53596DE0db359E998587a6Bb226AA5481",
            adminAddress2: "0xe087Aa17aDB5385ef7A0c9a7409689B14b4f911d",
            play: null,
            dai: null,
            sportEvents: [],
            daiTokenBalance: '0',
            loading: false,

            userContract: null,
            userContractAddress: null,
        };
        this.addSportEvent = this.addSportEvent.bind(this);
        this.captureFile = this.captureFile.bind(this);
    }

    async componentWillMount() {
        await this.init();
    }

    async init() {
        // Detect Metamask
        const metamaskInstalled = typeof window.web3 !== "undefined";
        this.setState({metamaskInstalled});
        if (metamaskInstalled) {
            await this.loadWeb3();
            await this.loadBlockchainData();
        }
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        // Load account
        const accounts = await web3.eth.getAccounts();
        this.setState({currentAccount: accounts[0]});
        console.log("account", accounts);
        // Network ID
        const networkId = await web3.eth.net.getId();
        const playNetworkData = Play.networks[networkId];
        const daiNetworkData = DAI.networks[networkId];

        if (playNetworkData) {
            // Assign contracts
            const play = new web3.eth.Contract(Play.abi, playNetworkData.address);
            this.setState({play});
            let daiTokenBalance = await play.methods.getBalance(this.state.currentAccount).call()
            this.setState({ daiTokenBalance: daiTokenBalance.toString()})
            const dai = new web3.eth.Contract(DAI.abi, daiNetworkData.address);
            this.setState({dai});
            // Get files amount
            const eventsCount = await play.methods.eventCount().call();
            this.setState({eventsCount});

            console.log("DAI", this.state.dai);

            // Load files&sort by the newest
            for (let i = eventsCount; i >= 1; i--) {
                const event = await play.methods.sportEvents(i).call();
                console.log('event number', event.eventId)
                this.setState({
                    sportEvents: [...this.state.sportEvents, event],
                });
            }
        } else {
            window.alert("Play contract not deployed to detected network.");
        }
    }

    // Get file from user
    captureFile = (event) => {
        event.preventDefault();

        const file = event.target.files[0];
        const reader = new window.FileReader();

        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({
                buffer: Buffer(reader.result),
            });
            console.log("buffer", this.state.buffer);
        };
    };

    addSportEvent = (description, teamA, teamB, date) => {
        console.log("Submitting file to IPFS...");

        // Add file to the IPFS
        ipfs.add(this.state.buffer, (error, result) => {
            console.log("IPFS result", result.size);
            if (error) {
                console.error(error);
                return;
            }

            this.setState({loading: true});

            this.state.play.methods
                .addSportEvent(result[0].hash, description, teamA, teamB, date)
                .send({from: this.state.currentAccount})
                .on("transactionHash", (hash) => {
                    this.setState({
                        loading: false,
                    });
                    window.location.reload();
                })
                .on("error", (e) => {
                    window.alert("Error");
                    this.setState({loading: false});
                });
        });
    };

    faucets1 = (address) => {
        this.state.dai.methods
            .transfer(address, 1000)
            .send({from: this.state.adminAddress2}); //change adminAddress
        console.log("FAUCET")
    };

    bet = (winner, amount) => {
        this.state.play.methods.bet(winner, amount).send({from: this.state.currentAccount});
    };

    checkEarnings = async (eventId) => {
        await this.state.dai.methods
            .checkEarnings()
            .call({from: this.state.currentAccount});
    };

    withdraw = async (playerAddress, eventId) => {
        await this.state.dai.methods
            .withdraw()
            .call({from: this.state.currentAccount});
    };

    getBalance = async (address) => {
        await this.state.dai.methods
            .balanceOf(address)
            .call({from: this.state.currentAccount});
    };


    render() {
        if (window.ethereum)
            window.ethereum.on("accountsChanged", function () {
                const accounts = window.ethereum.enable();
                window.location.reload();
                this.setState({currentAccount: accounts[0]});
            });
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Home/>
                            <Footer/>
                        </Route>

                        <Route path="/app" exact>

                            {/*Navbar*/}
                            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white shadow">
                                <div className="container">
                                    <Link className="navbar-brand p-0" to="/">
                                        <img src={logo} alt="logo" width="80" className="logo"/>
                                    </Link>

                                    <div>
                                        <ul className="navbar-nav ml-auto d-flex align-items-center">
                                            <li className="nav-item">
                                                <a className="nav-link" href="/">
                            <span className="primaryColor">
                              <strong>Bets</strong>
                            </span>
                                                </a>
                                            </li>
                                            <li className="nav-item pr-4">
                                                <a className="nav-link" href="/account">
                            <span className="primaryColor">
                              <strong>Compte</strong>
                            </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <div className="nav-link pool">
                                                    <Link href="">
                              <span className="textPool">
                                  {window.web3.utils.fromWei(this.state.daiTokenBalance, 'Ether')} <span>DAI</span>
                              </span>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                {this.state.currentAccount ? (
                                                    <div className="nav-link">
                                                        <div className="buttonAddress">
                                <span className="jazzicon">
                                  <Jazzicon address={this.state.currentAccount}/>
                                </span>
                                                            <span className="textAddress">
                                  <strong id="account">
                                    <a
                                        target="_blank"
                                        className="texta"
                                        rel="noopener noreferrer"
                                        href={
                                            "https://etherscan.io/address/" +
                                            this.state.currentAccount
                                        }
                                    >
                                      {this.state.currentAccount.substring(0, 6)}...
                                        {this.state.currentAccount.substring(38, 42)}
                                    </a>
                                  </strong>
                                </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="btn btn-outline-success wallet">
                                                        Connect Wallet
                                                    </div>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>

                            <Sidebar/>

                            {/*Cards bet*/}
                            {this.state.loading ? (
                                <div id="loader" className="text-center mt-5">
                                    <p>Loading...</p>
                                </div>
                            ) : (
                                <Main
                                    sportEvents={this.state.sportEvents}
                                    captureFile={this.captureFile}
                                    addSportEvent={this.addSportEvent}
                                    adminAddress={this.state.adminAddress}
                                    adminAddress2={this.state.adminAddress2}
                                    currentAccount={this.state.currentAccount}
                                    bet={this.bet}
                                    faucet={this.faucets1}
                                />
                            )}
                        </Route>
                        <Footer/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
