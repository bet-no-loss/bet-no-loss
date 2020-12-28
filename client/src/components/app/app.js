import React, {useState,useEffect} from "react";
import SimpleStorageContract       from "../../contracts/SimpleStorage.json";
import getWeb3                     from "../../getWeb3";

import "./app.css";

const App = () => {
  const [balance,setBalance] = useState(0);
  const [ethToSend, setEthToSend] = useState("");
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  async function init() {
    try {
      console.log("init try");
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  
  const handleValue = (evt) => {
    setEthToSend(evt.currentTarget.value);
  }

  const handleSubmit = (evt) =>  {
    evt.preventDefault();
    sendEth()
  };

  const sendEth = async () => {
    // Stores a given value, 5 by default.
    await contract.methods.set(ethToSend).send({ from: accounts[0]});

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    console.log(response);
    // Update state with the result.
    setStorageValue(Number(response)+Number(balance));
    setBalance(response);
    
  };
  useEffect(() => {
    init();
 },[]);

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <main className="app-main">
        <div>
          <h1>Good to Go!</h1>
          <p>Your Truffle Box is installed and ready.</p>
          <h2>Smart Contract Example</h2>
          <p>
            Feel free to send eth!!!
            You can see your stored balance below
          </p>
          <form onSubmit={handleSubmit}>
            <input className="app-input" type="text" value={ethToSend} onChange={handleValue}/>
            <button className="app-button" type="submit" value="Send" >Send</button>
          </form>
          <p>
            What amazing is Truffle with react Box 
          </p>
          <div>The stored balance is: {storageValue}</div>
          </div>
        </main>
    </div>
  );
}

export default App;
