import React, { useState, useContext } from "react";
import "./index.css";
import DatePicker from 'react-datepicker';
import Web3Context from '../Web3context';

function SportEventForm() {

    const web3Context = useContext(Web3Context);
    const { web3, accounts, contract } = web3Context;

    const [selectedDate, setSelectedDate] = useState('')

    const selectDate = (date) => {
        setSelectedDate(date);
        let print = date.toISOString().split('T')[0];  
        console.log(print)
    }

    const style = {
        paddingRight: "490px"
    }

  return (
    <div>
        <p>{accounts}</p>
      <form>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label" style={{marginRight:"530px"}}>
            Name 
          </label>
          <input type="text" className="form-control" id="inputName" />
        </div>
        <div className="mb-3" style={style}>
          <label htmlFor="example-date-input" className="col-2 col-form-label" >
            Event Date
          </label>
          <DatePicker 
          selected={selectedDate}
          onChange={selectDate}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}
         
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label" style={{marginRight:"530px"}}>
            Team A
          </label>
          <input type="text" className="form-control" id="inputName" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label" style={{marginRight:"530px"}}>
            Team B
          </label>
          <input type="text" className="form-control" id="inputName" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit 
        </button>
      </form>
    </div>
  );
}

export default SportEventForm;
