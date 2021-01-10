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
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOutcomeDate, setSelectedOutcomeDate] = useState("");
  // const initialState = {
  //   eventName: "",
  //   eventDate: "",
  //   teamA: "",
  //   teamB: "",
  //   outcomeAvailableDate: "",
  // };
  // const [sportEvent, setSportEvent] = useState(initialState);

  const selectEventDate = (date) => {
    setSelectedDate(date);
    let evDate = date.getTime();
    //const dateBN = new BigNumber(evDate);
    setSportEvent({ ...sportEvent, eventDate: evDate });
    console.log("Event Date", evDate);
  };

  const selectOutcomeDate = (date) => {
    setSelectedOutcomeDate(date);
    let outcomeDate = date.getTime();
    //const dateBN = new BigNumber(outcomeDate);
    setSportEvent({ ...sportEvent, outcomeAvailableDate: outcomeDate });
    console.log("Outcome Date",outcomeDate);
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
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{ marginLeft: "300px" }}
          >
            Submit
          </button>
        </form>
        {/* <button onClick={testName} className="btn btn">
          Submit
        </button> */}
      </div>
    </div>
  );
}

export default SportEventForm;
