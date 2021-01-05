import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import DatePicker from "react-datepicker";
import Web3Context from "../Web3context";

function SportEventForm() {
  const web3Context = useContext(Web3Context);
  const { web3, accounts, contract, currentAccount } = web3Context;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOutcomeDate, setSelectedOutcomeDate] = useState("");
  const initialState = {
    eventName: "",
    eventDate: "",
    teamA: "",
    teamB: "",
    outcomeAvailableDate: "",
  };
  const [sportEvent, setSportEvent] = useState(initialState);

  console.log("WEB3", web3.eth.getAccounts());

  const selectEventDate = (date) => {
    setSelectedDate(date);
    //let evDate = date.toISOString().split("T")[0];
    let evDate = date.getTime();
    setSportEvent({ ...sportEvent, eventDate: evDate });
    console.log(evDate);
  };

  const selectOutcomeDate = (date) => {
    setSelectedOutcomeDate(date);
    let outcomeDate = date.getTime();
    setSportEvent({ ...sportEvent, outcomeAvailableDate: outcomeDate });
    console.log(outcomeDate);
  };

  const style = {
    paddingRight: "369px",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sportEvent);
    createSportEvent();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSportEvent({ ...sportEvent, [name]: value });
  };

  const createSportEvent = async () => {
    const create = await contract.methods
      .createSportEvent(
        sportEvent.eventName,
        sportEvent.eventDate,
        sportEvent.outcomeAvailableDate
      )
      .send({ gas: 900000, from: accounts });
    const response = await contract.methods.sportEvents.get().call();
    console.log("CreateSportEvent Response", response);
  };

  const Web3 = async () => {
    const method = await contract.methods;
    console.log("methods", method);
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="eventName"
            className="form-control"
            id="inputName"
            value={sportEvent.eventName}
            placeholder="Event Name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3" style={style}>
          <DatePicker
            name="eventDate"
            selected={selectedDate}
            onChange={selectEventDate}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            placeholderText="Event Date"
          />
        </div>
        <div className="mb-3" style={style}>
          <DatePicker
            name="outcomeAvailableDate"
            selected={selectedOutcomeDate}
            onChange={selectOutcomeDate}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            placeholderText="Event Outcome Date"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="teamA"
            className="form-control"
            id="inputName"
            placeholder="Team A"
            value={sportEvent.teamA}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="teamB"
            className="form-control"
            id="inputName"
            placeholder="Team B"
            value={sportEvent.teamB}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
      <button onClick={testName} className="btn btn">
        Submit
      </button>
    </div>
  );
}

export default SportEventForm;
