import React, { useState, useEffect } from "react";
import Bet from "../../contracts/Bet.json";
import BetOracle from "../../contracts/BetOracle.json";
import getWeb3 from "../../getWeb3";
import SportEventForm from "../SportEventsForm/SportEventForm";
import "react-datepicker/dist/react-datepicker.css";
import Web3Context from "../Web3context";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import "./app.css";
import Navbar from "../Navbar/Navbar";
import SportEventList from "../SportEventList/SportEventList";
import BetEvent from "../BetEvent/BetEvent";
import Layout from "../Layout/Layout";
import Card from "../Card/Card";
import BetList from "../pages/Bets/BetList";
import Admin from "../Admin/Admin";
import Account from "../Account/Account";
import Sidebar from "../Sidebar/Sidebar";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [oracleContract, setoracleContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [testName, setTestName] = useState("This is a test");

  const initialState = {
    eventName: "",
    /*eventDate: "",*/
    teamA: "",
    teamB: "",
    /*outcomeAvailableDate: "",*/
  };
  const [sportEvent, setSportEvent] = useState(initialState);

  async function init() {
    try {
      console.log("init try");
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("ACCOUNTS in TRY", accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Bet.networks[networkId];
      const deployedNetworkOracle = BetOracle.networks[networkId];
      const instance = new web3.eth.Contract(
        Bet.abi,
        deployedNetwork && deployedNetwork.address
      );
      const oracleInstance = new web3.eth.Contract(
        BetOracle.abi,
        deployedNetworkOracle && deployedNetworkOracle.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
      setoracleContract(oracleInstance);

      console.log('sport',sportEvent)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }

  const getAccount = async () => {
    const accounts = await window.ethereum.enable();
    setCurrentAccount(accounts[0]);
  };

  window.ethereum.on("accountsChanged", function () {
    getAccount();
  });

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    getAccount();
    console.log("ACCOUNTS", accounts);
  }, [currentAccount]);



  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <Web3Context.Provider
        value={{
          web3,
          accounts,
          contract,
          oracleContract,
          currentAccount,
          sportEvent,
          setSportEvent,
          testName,
          setTestName,
        }}
      >
        <Router>
          <div className="App">
            <Switch>
              <Route path='/admin'>
                <Layout>
                  <Admin/>
                </Layout>
              </Route>
              <Route path='/account'>
                <Layout>
                  <Account/>
                </Layout>
              </Route>
              <Route path='/'>
                <main className="app-main">
                  <Layout>
                    <Sidebar/>
                    {/*<SportEventForm />
                    <SportEventList />
                    <BetEvent />*/}
                    <BetList />

                  </Layout>
                </main>
              </Route>
            </Switch>
          </div>
        </Router>

      </Web3Context.Provider>
    </div>
  );
};

export default App;
