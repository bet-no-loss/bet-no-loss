import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import Web3Context from "../Web3context";
import { BigNumber } from "bignumber.js";

function SportEventForm() {
  const web3Context = useContext(Web3Context);
  const {
    web3,
    accounts,
    contract,
    oracleContract,
    currentAccount,
    sportEvent,
    setSportEvent,
  } = web3Context;

  const [oracleAddr, setOracleAddr] = useState("");
  const [addr, setAddr] = useState("");

  const selectEventDate = (date) => {
    let evDate = date.getTime();
    //const dateBN = new BigNumber(evDate);
    setSportEvent({ ...sportEvent, eventDate: evDate });
    console.log("Event Date", evDate);
  };

  const style = {
    paddingRight: "550px",
  };

 /* const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(sportEvent);
    await createEvent();
  };*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSportEvent({ ...sportEvent, [name]: value });
  };

  const createEvent = async () => {
    try {
      const create = await contract.methods
        .createSportEvent(
          sportEvent.eventName,
          sportEvent.eventDate,
          sportEvent.outcomeAvailableDate
        )
        .send({ gas: 2100000, from: accounts[0] });
      console.log("CREATE", create);

      const response = await contract.methods
        .sportEvents(sportEvent.eventName)
        .call({ from: accounts[0] });
      console.log("CreatedSportEvent Response", response);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getOracleAddress = async (e) => {
    e.preventDefault();
    try {
      let Addr = await oracleContract.methods
        .getAddress()
        .call({ from: accounts[0] });
      console.log("Oracle Address", Addr);
      setOracleAddr(Addr);
    } catch (error) {
      console.log(error);
    }
  };

  const insertAddress = async () => {
    try {      
      const insert = await contract.methods
        .setOracleAddress(oracleAddr)
        .send({ gas: 2100000, from: currentAccount });
        
    } catch (error) {
      console.log("Insert Address Error", error);
    }
  };

  const handleInsert = (ev) => {
    ev.preventDefault();
    const add = oracleAddr;
    const res = add.toLowerCase();
    insertAddress(res); 
    console.log(res);
  };

  const testConnection = async () => {
    const test = await contract.methods
      .testOracleConnection()
      .call({ from: accounts[0] });
    console.log("Test Connection", test);
  };

  const addData = async () => {
    console.log('add')
  }

  /*const addProposal = async (content) => {
    await instance.methods.addProposal(content).send({ from: admin });
  };*/

  const testName = async () => {
    const insert = await contract.methods
      .insertText("name")
      .send({ gas: 900000, from: accounts[0] });
    const response = await contract.methods
      .names(0)
      .call({ from: accounts[0] });
    console.log("Test insert text", response);
  };

  console.log("BET CONTRACT", contract);
  console.log("ORACLE CONTRACT", oracleContract);

  useEffect(() => {
  }, []);

  return (
    <div className="card text-center">
      <div className="card-header">Create Sport Event</div>
      <div className="card-body">
        <form onSubmit={getOracleAddress}>
          <div className="mb-3">
            <label htmlFor="oracleAddress" className="form-label">
              Oracle Address
            </label>
            <input
              type="text"
              className="form-control"
              id="oracleAddress"
              value={oracleAddr}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Get
          </button>
        </form>
        <form onSubmit={handleInsert}>
          <div className="mb-3">
            <label htmlFor="oracleAddress" className="form-label">
              Insert Oracle Address
            </label>
            {/*<input
              type="text"
              className="form-control"
              id="oracleAddressInput"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
            />*/}
          </div>
          <button type="submit" className="btn btn-primary">
            Insert
          </button>
        </form>
        <br />
        <button type="submit" className="btn btn-primary" onClick={testConnection}>
          Test Connection
        </button>
        <br />
        <br />
        <button
          onClick={addData}
          className="btn btn-primary"
        >
          Add Test Data
        </button>
        {/* <button onClick={testName} className="btn btn">
          Submit
        </button> */}
      </div>
    </div>
  );
}

export default SportEventForm;
