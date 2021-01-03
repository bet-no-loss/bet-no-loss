import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import DatePicker from "react-datepicker";
import Web3Context from "../Web3context";

function SportEventForm() {
  const web3Context = useContext(Web3Context);
  const { web3, accounts, contract } = web3Context;
  //console.log("Contract", contract)
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOutcomeDate, setSelectedOutcomeDate] = useState("");
  const initialState = {name: "", eventDate: "", teamA: "", teamB: "", eventOutcomeDate: ""}
  const [sportEvent, setSportEvent] = useState(initialState);

  const selectEventDate = (date) => {
    setSelectedDate(date);    
    let evDate = date.toISOString().split("T")[0];
    setSportEvent({...sportEvent, eventDate : evDate}); 
    console.log(evDate);
  };

  const selectOutcomeDate = (date) => {
    setSelectedOutcomeDate(date);
    let outcomeDate = date.toISOString().split("T")[0];
    setSportEvent({...sportEvent, eventOutcomeDate : outcomeDate});    
    console.log(outcomeDate);
  };
  

  const style = {
    paddingRight: "369px",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sportEvent)
   // createSportEvent();   
  };

  const handleChange = (event) => {
      const { name, value } = event.target;
      setSportEvent({...sportEvent, [name] : value})      
  }

  const createSportEvent = async () => {
      await contract.methods.createSportEvent(sportEvent).send({ from:accounts[0] });
      const response = await contract.methods.sportEvents.get().call();
      console.log(response);
  }

  const Web3 = async () => {
    const method = await contract.methods;
    console.log("methods", method)
  }

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <p>{accounts}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            id="inputName"
            value={sportEvent.name}
            placeholder="Name"
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
            name="eventOutcomeDate"
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SportEventForm;
