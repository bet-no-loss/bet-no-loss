import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import DatePicker from "react-datepicker";
import Web3Context from "../Web3context";
import { BigNumber } from "bignumber.js";

function SportEventForm() {
  const web3Context = useContext(Web3Context);
  const {
    web3,
    accounts,
    contract,
    currentAccount,
    sportEvent,
    setSportEvent,
  } = web3Context;

  const selectEventDate = (date) => {
    let evDate = date.getTime();
    //const dateBN = new BigNumber(evDate);
    setSportEvent({ ...sportEvent, eventDate: evDate });
    console.log("Event Date", evDate);
  };

  const style = {
    paddingRigth: "550px",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sportEvent);
    createEvent();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
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

  const testName = async () => {
    const insert = await contract.methods
      .insertText("name")
      .send({ gas: 900000, from: accounts[0] });
    const response = await contract.methods
      .names(0)
      .call({ from: accounts[0] });
    console.log("Test insert text", response);
  };

  useEffect(() => {
    console.log("CONTRACT", contract);
  }, [contract]);

  return (
    <div className="card text-center">
      <div className="card-header">Create Sport Event</div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label htmlFor="oracleAddress" className="form-label">
              Oracle Address
            </label>
            <input
              type="text"
              className="form-control"
              id="oracleAddress"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Get
          </button>
        </form>
        <br />
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          onSubmit={handleSubmit}
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
