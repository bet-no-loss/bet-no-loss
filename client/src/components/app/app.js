import React, { useState, useEffect } from "react";
import Bet from "../../contracts/Bet.json";
import Bet2 from "../../contracts/Bet.json";
import getWeb3 from "../../getWeb3";
import SportEventForm from "../SportEventsForm/SportEventForm";
import "react-datepicker/dist/react-datepicker.css";
import Web3Context from "../Web3context";

//import "./app.css";
import Navbar from "../Navbar/Navbar";
import SportEventList from "../SportEventList/SportEventList";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [ethToSend, setEthToSend] = useState("");
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [testName, setTestName] = useState("This is a test");
  const initialState = {
    eventName: "",
    eventDate: "",
    teamA: "",
    teamB: "",
    outcomeAvailableDate: "",
  };
  const [sportEvent, setSportEvent] = useState(initialState);

  async function init() {
    try {
      console.log("init try");
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Bet2.networks[networkId];
      const instance = new web3.eth.Contract(
        Bet2.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
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
  }, [currentAccount]);

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <Web3Context.Provider
        value={{ web3, accounts, contract, currentAccount, sportEvent, setSportEvent, testName, setTestName }}
      >
        <main className="app-main">
          <div>
            <Navbar />
            <SportEventForm />
            <SportEventList />
          </div>
        </main>
      </Web3Context.Provider>
    </div>
  );
};

export default App;
